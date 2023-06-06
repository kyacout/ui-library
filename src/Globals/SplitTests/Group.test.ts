import {
  convertToGroup,
  Group,
} from '@Globals/SplitTests/Group'

describe('convertToGroup', () => {
  test.each<[any, Group]>([
    // Group.A
    [false, Group.A],
    ['false', Group.A],
    [0, Group.A],
    ['0', Group.A],
    ['a', Group.A],
    ['A', Group.A],
    // Group.B
    [true, Group.B],
    ['true', Group.B],
    [1, Group.B],
    ['1', Group.B],
    ['b', Group.B],
    ['B', Group.B],
    // Unknown
    [NaN, Group.Unknown],
    ['NaN', Group.Unknown],
    [null, Group.Unknown],
    ['null', Group.Unknown],
    [undefined, Group.Unknown],
    ['undefined', Group.Unknown],
    [2, Group.Unknown],
    ['2', Group.Unknown],
    ['c', Group.Unknown],
    ['C', Group.Unknown],
  ])('convertToGroup(%s) -> %s', (
    input: any,
    expected: Group,
  ) => {
    expect(convertToGroup(input)).toStrictEqual(expected)
  })
})
