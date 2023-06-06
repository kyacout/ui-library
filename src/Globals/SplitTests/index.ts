import { Group } from '@Globals/SplitTests/Group'

export interface SplitTest {
  group: Group
  header: string
}

export type SplitTests = Record<string, SplitTest>
