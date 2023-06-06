import get from 'lodash/get'
import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
} from 'react'
import useSWR from 'swr'

import { storeURL } from '@Globals/Store'

interface ResponseData {
  status: 'OK' | 'ERROR'
}

interface UserDataOtherCountryRaw {
  country: string
  countryName: string
  isEuCountry: boolean
}

interface UserDataWishlistRaw {
  abundance: number
  productIds: number[]
}

interface UserDataRaw {
  basketQty: number
  geoIpCountryCode?: string
  loggedIn: boolean
  otherCountryData?: UserDataOtherCountryRaw
  quoteId: string
  wishlist: UserDataWishlistRaw
}

export interface Basket {
  quantity: number
}

interface OtherCountry {
  country: string
  countryNameMap: Record<number, string>
  isEU: boolean
}

export interface WishList {
  abundance: number
  productIDs: number[]
}

export interface UserData {
  basket: Basket
  geoIPCountryCode?: string
  loggedIn: boolean
  otherCountry?: OtherCountry
  quoteID: string
  wishList: WishList
}

interface UserProviderProps {
  children: ReactNode
}

interface UserProviderValue {
  error?: string
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<boolean>
  resetPassword: (email: string) => Promise<boolean>
  revalidate: () => Promise<boolean>
  userData?: UserData
}

const convertRaw = (input?: UserDataRaw): UserData | null => {
  if (!input) {
    return null
  }

  let otherCountry: OtherCountry = null

  if (input.otherCountryData) {
    otherCountry = {
      country: input.otherCountryData.country,
      countryNameMap: input.otherCountryData.countryName,
      isEU: input.otherCountryData.isEuCountry,
    }
  }

  return {
    basket: {
      quantity: input.basketQty,
    },
    geoIPCountryCode: input.geoIpCountryCode,
    loggedIn: input.loggedIn,
    otherCountry,
    quoteID: input.quoteId,
    wishList: {
      abundance: input.wishlist.abundance,
      productIDs: input.wishlist.productIds,
    },
  }
}

const fetcher = async (input: RequestInfo, init?: RequestInit): Promise<UserData | null> => {
  const res = await fetch(input, init)

  const json = await res.json()

  return convertRaw(get(json, 'data'))
}

export const UserContext = createContext<UserProviderValue>(null)
export const UserConsumer = UserContext.Consumer
export const UserProvider: FC<UserProviderProps> = (
  {
    children,
  }: UserProviderProps,
) => {
  if (typeof window === 'undefined') {
    return (
      <UserContext.Provider
        value={{
          error: null,
          loading: true,
          login: async () => false,
          logout: async () => false,
          resetPassword: async () => false,
          revalidate: async () => false,
          userData: null,
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }

  const { data, error, revalidate } = useSWR('/scripts/development/endpoints/userData.php', fetcher)
  const loginReqURL = storeURL('customer/account/loginPost')
  const resetPasswordURL = storeURL('customer/account/forgotPasswordPost')
  const logoutURL = storeURL('customer/account/logout')

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const res = await fetch(loginReqURL, {
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        const json: ResponseData = await res.json()

        if (json.status !== 'OK') {
          return false
        }
      } catch (err) {
        console.log('[user] failed to log in', err)
        return false
      }

      try {
        await revalidate()
      } catch (err) {
        // ignore errors if we fail to revalidate
      }

      return true
    },
    [revalidate],
  )

  const resetPassword = useCallback(async (email: string) => {
    try {
      const res = await fetch(resetPasswordURL, {
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })

      const json = await res.json()

      if (json.status !== 'OK') {
        return false
      }
    } catch (err) {
      console.log('[user] failed to reset password', err)
      return false
    }

    return true
  }, [])

  const logout = useCallback(
    async () => {
      try {
        await fetch(logoutURL, { method: 'POST' })

        try {
          await revalidate()
        } catch (err) {
          // ignore errors if we fail to revalidate
        }

        return true
      } catch (err) {
        console.log('[user] failed to log out', err)
        return false
      }
    },
    [revalidate],
  )

  return (
    <UserContext.Provider
      value={{
        error,
        loading: !data,
        login,
        logout,
        resetPassword,
        revalidate,
        userData: data,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
