import forEach from 'lodash/forEach'
import get from 'lodash/get'
import has from 'lodash/has'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import isString from 'lodash/isString'
import omitBy from 'lodash/omitBy'
import pickBy from 'lodash/pickBy'
import reduce from 'lodash/reduce'
import sortBy from 'lodash/sortBy'

import { getCustomersClient } from '@Globals/API/Customers'
import { GetCustomerIDRequest } from '@Protos/customers/customers_pb'

const MPARTICLE_NO_COVERAGE = -1
const MPARTICLE_VALIDATION_ISSUE = -4
const MPARTICLE_TOO_MANY_REQUESTS = 429

type UserAttributes = Record<string, string | string[]>
type UserAttributesInput = Record<string, string>

interface User {
  getAllUserAttributes: () => UserAttributes
  getMPID: () => string
  removeAllUserAttributes: () => void
  setUserAttribute: (key: string, value: string) => void
  setUserAttributeList: (key: string, value: string[]) => void
  setUserAttributes: (attributes: UserAttributesInput) => void
}

type CurrentUser = User | false

interface IdentifyProps {
  customerID?: string
  email?: string
}

interface IdentifyUserIdentities {
  customerid?: string
  email?: string
}

interface IdentifyRequest {
  userIdentities: IdentifyUserIdentities
}

interface IdentifyResponseBase {
  httpCode: number
}

interface IdentifyResponse extends IdentifyResponseBase {
  getPreviousUser: () => CurrentUser
  getUser: () => User
}

type IdentifyFunc = (req: IdentifyRequest, callback: (res: IdentifyResponse) => void) => void

interface AliasRequest {
}

type CreateAliasRequestFunc = (previousUser: User, user: User) => AliasRequest

type AliasUsersFunc = (req: AliasRequest, callback: (res: IdentifyResponseBase) => void) => void

export const getCurrentUser = (): CurrentUser => {
  if (!has(window, 'mParticle.Identity.getCurrentUser')) {
    return false
  }

  const getCurrentUserFunc: () => User = get(window, 'mParticle.Identity.getCurrentUser')

  return getCurrentUserFunc() || false
}

export const waitForCurrentUser = (): Promise<User> => new Promise((accept, reject) => {
  let user = getCurrentUser()

  if (user) {
    accept(user)
    return
  }

  let triesLeft = 10
  const interval = setInterval(() => {
    triesLeft -= 1

    if (triesLeft === 0) {
      clearInterval(interval)
      reject(new Error('[user] failed to find user after 10 tries'))
      return
    }

    user = getCurrentUser()
    if (!user) {
      return
    }

    clearInterval(interval)
    accept(user)
  }, 50)
})

const verifyUserAttributes = (
  current: UserAttributes,
  want: UserAttributes,
): boolean => reduce(
  want,
  (memo: boolean, value, key) => {
    if (!memo) {
      return false
    }

    if (isArray(value) && isEqual(sortBy(value), sortBy(current[key]))) {
      return true
    }

    if (value === current[key]) {
      return true
    }

    return false
  },
  true,
)

// waitForUserAttibutes is not really needed, as mParticle's setUserAttribute calls are synchronous
// we'll keep it as is, in case the SDK fails silently, so we can catch any unknown errors.
const waitForUserAttributes = async (
  attributes: UserAttributes,
): Promise<void> => new Promise((accept, reject) => {
  let triesLeft = 10

  const interval = setInterval(() => {
    triesLeft -= 1

    if (triesLeft === 0) {
      clearInterval(interval)
      reject(new Error('[user] failed to verify user attributes after 10 tries'))
    }

    const user = getCurrentUser()
    if (!user) {
      return
    }

    if (!verifyUserAttributes(user.getAllUserAttributes(), attributes)) {
      return
    }

    clearInterval(interval)
    accept()
  }, 50)
})

// getAllUserAttributes waits for current user to be available, and calls getAllUserAttributes
export const getAllUserAttributes = async (): Promise<UserAttributes> => {
  const user = await waitForCurrentUser()
  return user.getAllUserAttributes()
}

// setUserAttribute waits for current user to be available, calls setUserAttribute, and waits for
// attributes to be set
export const setUserAttribute = async (key: string, value: string): Promise<void> => {
  const user = await waitForCurrentUser()
  user.setUserAttribute(key, value)
  return waitForUserAttributes({ [key]: value })
}

// setUserAttributeList waits for current user to be available, calls setUserAttributeList, and
// waits for attributes to be set
export const setUserAttributeList = async (key: string, value: string[]): Promise<void> => {
  const user = await waitForCurrentUser()
  user.setUserAttributeList(key, value)
  return waitForUserAttributes({ [key]: value })
}

// setUserAttributes waits for current user to be available, calls setUserAttributes, and waits for
// attributes to be set
export const setUserAttributes = async (attributes: UserAttributesInput): Promise<void> => {
  // We don't want to override existing attributes with empty string values.
  const attributesWithoutEmptyStrings = omitBy(attributes, value => value === '')
  const user = await waitForCurrentUser()
  user.setUserAttributes(attributesWithoutEmptyStrings)
  return waitForUserAttributes(attributesWithoutEmptyStrings)
}

const hasHttpError = (res: IdentifyResponseBase): Error | false => {
  if (res.httpCode === MPARTICLE_NO_COVERAGE) {
    return new Error('[user] identify: no http coverage')
  }

  if (res.httpCode === MPARTICLE_TOO_MANY_REQUESTS) {
    return new Error('[user] identify: too many requests')
  }

  if (res.httpCode === MPARTICLE_VALIDATION_ISSUE || res.httpCode === 400) {
    return new Error('[user] identify: validation issue')
  }

  return false
}

export const identify = async (
  {
    customerID = null,
    email = null,
  }: IdentifyProps,
): Promise<void> => {
  if (!customerID && !email) {
    throw new Error('[user] identify: either customerID or email must be defined')
  }

  const identifyFunc: IdentifyFunc = get(window, 'mParticle.Identity.identify')
  const createAliasRequestFunc: CreateAliasRequestFunc = get(
    window,
    'mParticle.Identity.createAliasRequest',
  )
  const aliasUsersFunc: AliasUsersFunc = get(window, 'mParticle.Identity.aliasUsers')

  let id = customerID

  if (email && !customerID) {
    const customersClient = getCustomersClient()

    const req = new GetCustomerIDRequest()
    req.setEmail(email)

    const res = await customersClient.getCustomerID(req)

    id = res.getCustomerId()
  }

  return new Promise((accept, reject) => {
    const req: IdentifyRequest = {
      userIdentities: {},
    }

    if (id) {
      req.userIdentities.customerid = id
    }

    if (email) {
      req.userIdentities.email = email
    }

    identifyFunc(req, (res) => {
      const identifyError = hasHttpError(res)
      if (identifyError) {
        reject(identifyError)
        return
      }

      const previousUser = res.getPreviousUser()
      if (!previousUser) {
        accept()
        return
      }

      const user = res.getUser()

      const previousUserAttributes = previousUser.getAllUserAttributes()
      if (!isEmpty(previousUserAttributes)) {
        // Set all non-array user attributes, as the multi-setter doesn't support array values
        user.setUserAttributes(pickBy(previousUserAttributes, isString))

        // Set all array user attributes individually
        forEach(
          pickBy(previousUserAttributes, isArray),
          (value: string[], key: string) => {
            user.setUserAttributeList(key, value)
          },
        )

        // Clean up previous user attributes, to avoid overriding attributes in the future
        previousUser.removeAllUserAttributes()
      }

      const aliasReq = createAliasRequestFunc(previousUser, user)
      aliasUsersFunc(aliasReq, (aliasRes) => {
        const aliasUsersError = hasHttpError(aliasRes)
        if (aliasUsersError) {
          reject(aliasUsersError)
          return
        }

        accept()
      })
    })
  })
}
