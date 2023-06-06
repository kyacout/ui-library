import noop from 'lodash/noop'
import { createContext } from 'react'

import { SplitTests } from '@Globals/SplitTests'
import { Group } from '@Globals/SplitTests/Group'

interface SplitTestsContextData {
  activateSplitTest: (test: string, group: Group) => void
  splitTests: SplitTests
}

const defaultValue: SplitTestsContextData = {
  activateSplitTest: noop,
  splitTests: {},
}

export const SplitTestsContext = createContext<SplitTestsContextData>(defaultValue)
export const SplitTestsConsumer = SplitTestsContext.Consumer
export const SplitTestsProvider = SplitTestsContext.Provider
