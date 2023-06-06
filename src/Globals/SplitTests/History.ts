import mapValues from 'lodash/mapValues'

import Sentry from '@Globals/Sentry'
import { SplitTests } from '@Globals/SplitTests'
import { convertToGroup } from '@Globals/SplitTests/Group'
import { storageAvailable } from '@Globals/Storage'

const SPLIT_TESTS_KEY = 'mp-split-tests-v3'

const parseLocalStorage = (): Record<string, any> => {
  if (!storageAvailable('localStorage')) {
    return {}
  }

  const raw = window.localStorage.getItem(SPLIT_TESTS_KEY)
  if (!raw) {
    return {}
  }

  try {
    const items: Record<string, any> = JSON.parse(raw)
    return items
  } catch (err) {
    Sentry.captureException(err)
    return {}
  }
}

export const getSplitTestsHistory = (): SplitTests => mapValues(
  parseLocalStorage(),
  group => ({
    group: convertToGroup(group),
    header: '',
  }),
)

export const upsertSplitTestsHistory = (splitTests: SplitTests) => {
  if (!storageAvailable('localStorage')) {
    return
  }

  const splitTestsCombined = {
    ...getSplitTestsHistory(),
    ...splitTests,
  }

  window.localStorage.setItem(
    SPLIT_TESTS_KEY,
    JSON.stringify(mapValues(splitTestsCombined, 'group')),
  )
}
