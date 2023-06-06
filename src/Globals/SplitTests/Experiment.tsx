import indexOf from 'lodash/indexOf'
import isEmpty from 'lodash/isEmpty'
import { FC, ReactElement, useContext } from 'react'

import { MetadataContext } from '@Globals/Metadata'
import { SplitTestsContext } from '@Globals/SplitTests/Context'
import { Group } from '@Globals/SplitTests/Group'

type ExperimentProps = Partial<{
  [key in Group]: ReactElement
}> & {
  stores?: string[]
  test: string
}

export const Experiment: FC<ExperimentProps> = (
  {
    stores,
    test,
    ...elements
  }: ExperimentProps,
) => {
  const { activateSplitTest, splitTests } = useContext(SplitTestsContext)
  const { store } = useContext(MetadataContext)

  const activeOnStore = isEmpty(stores) || indexOf(stores, store?.name) !== -1
  const splitTest = splitTests[test]

  if (!splitTest || !activeOnStore) {
    return elements.A || null
  }

  const { group } = splitTest

  activateSplitTest(test, group)

  return elements[group] || null
}
