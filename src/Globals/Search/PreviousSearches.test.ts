/**
 * @jest-environment jsdom
 */

import 'jest-localstorage-mock'

import {
  getPreviousSearches,
  LS_SITE_SEARCH_PREVIOUS_SEARCHES,
} from './PreviousSearches'

describe('getPreviousSearches', () => {
  const now = new Date().getTime()
  const fifteenDaysAgo = now - 1000 * 60 * 60 * 24 * 15

  test.each([
    // Invalid JSON
    ['bad-value', []],
    [`[bad-value,{"timestamp":${now}}]`, []],
    [`[{"timestamp":${now}},bad-value,{"timestamp":${now}}]`, []],

    // 0% compatible
    [null, []],
    ['', []],
    ['"bad-string"', []],
    ['{"bad":"object"}', []],
    ['[]', []],
    ['[{"bad":"object"}]', []],

    // 50% compatible
    [`[null,{"timestamp":${now}}]`, [{ timestamp: now }]],
    [`["",{"timestamp":${now}}]`, [{ timestamp: now }]],
    [`["bad-string",{"timestamp":${now}}]`, [{ timestamp: now }]],
    [`[[],{"timestamp":${now}}]`, [{ timestamp: now }]],
    [`[{"bad":"object"},{"timestamp":${now}}]`, [{ timestamp: now }]],

    // 66% compatible
    [
      `[{"timestamp":${now}},null,{"timestamp":${now}}]`,
      [{ timestamp: now }, { timestamp: now }],
    ],
    [
      `[{"timestamp":${now}},"",{"timestamp":${now}}]`,
      [{ timestamp: now }, { timestamp: now }],
    ],
    [
      `[{"timestamp":${now}},"bad-string",{"timestamp":${now}}]`,
      [{ timestamp: now }, { timestamp: now }],
    ],
    [
      `[{"timestamp":${now}},[],{"timestamp":${now}}]`,
      [{ timestamp: now }, { timestamp: now }],
    ],
    [
      `[{"timestamp":${now}},{"bad":"object"},{"timestamp":${now}}]`,
      [{ timestamp: now }, { timestamp: now }],
    ],

    // 100% compatible
    [`[{"timestamp":${now}}]`, [{ timestamp: now }]],
    [`[{"timestamp":${now}},{"timestamp":${now}}]`, [{ timestamp: now }, { timestamp: now }]],

    // Previous searches older than 14 days should not be included
    [`[{"timestamp":${now}},{"timestamp":${fifteenDaysAgo}}]`, [{ timestamp: now }]],
  ])('getPreviousSearches "%s" -> "%s"', (localStorageValue, expected) => {
    localStorage.clear()

    if (localStorageValue) {
      localStorage.setItem(LS_SITE_SEARCH_PREVIOUS_SEARCHES, localStorageValue)
    }

    expect(getPreviousSearches()).toStrictEqual(expected)
  })
})
