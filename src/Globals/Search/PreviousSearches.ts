import { EventEmitter } from 'events'
import filter from 'lodash/filter'
import isArray from 'lodash/isArray'
import noop from 'lodash/noop'
import reduce from 'lodash/reduce'
import reject from 'lodash/reject'
import sortBy from 'lodash/sortBy'
import { useEffect, useState } from 'react'

import { storageAvailable } from '@Globals/Storage'

export const LS_SITE_SEARCH_PREVIOUS_SEARCHES = 'site-search-previous-searches'

export enum PreviousSearchItemTypes {
  Brand = 'brand',
  Category = 'category',
  FreeText = 'free-text',
  Product = 'product',
}

export interface PreviousSearch {
  brand?: string
  id?: string
  parentTitle?: string
  slug: string
  timestamp: number
  title: string
  type: PreviousSearchItemTypes
}

type SearchData = Omit<PreviousSearch, 'timestamp'>

const events = new EventEmitter()

const isPreviousSearch = (
  item: any,
): item is PreviousSearch => {
  if (!item) {
    return false
  }

  return (item as PreviousSearch).timestamp !== undefined
}

// Fetches previous searches from localStorage, and filters any searches older than 14 days away
export const getPreviousSearches = (): PreviousSearch[] => {
  if (!storageAvailable('localStorage')) {
    return []
  }

  const raw = window.localStorage.getItem(LS_SITE_SEARCH_PREVIOUS_SEARCHES)
  if (!raw) {
    return []
  }

  try {
    let parsed = JSON.parse(raw)
    if (!isArray(parsed)) {
      return []
    }

    const fourteenDaysAgo = new Date().getTime() - 1000 * 60 * 60 * 24 * 14

    parsed = reduce<any, PreviousSearch[]>(
      parsed,
      (memo, item) => {
        if (!isPreviousSearch(item)) {
          return memo
        }

        if (item.timestamp < fourteenDaysAgo) {
          return memo
        }

        return [...memo, item]
      },
      [],
    )

    return sortBy(parsed, p => -p.timestamp)
  } catch (err) {
    return []
  }
}

export const addPreviousSearch = (searchData: SearchData) => {
  if (!storageAvailable('localStorage')) {
    return
  }

  const newItem: PreviousSearch = { ...searchData, timestamp: new Date().getTime() }
  const { id, title, type } = newItem

  const newPreviousSearches = [
    newItem,
    // TODO: after 14 days we can be sure the id is always available and search by { id, type } only
    ...reject(getPreviousSearches(), id ? { id, type } : { title, type }),
  ]
  localStorage.setItem(LS_SITE_SEARCH_PREVIOUS_SEARCHES, JSON.stringify(newPreviousSearches))

  try {
    events.emit('storage', new StorageEvent('internal', { key: LS_SITE_SEARCH_PREVIOUS_SEARCHES }))
  } catch (e) {
    // ignore error
  }
}

export const addSearchFromFreeText = (searchQuery: string, searchURL: string) => {
  addPreviousSearch({
    id: searchQuery,
    slug: searchURL,
    title: searchQuery,
    type: PreviousSearchItemTypes.FreeText,
  })
}

export const removePreviousSearchItem = (type: string, id?: string, title?: string) => {
  if (!storageAvailable('localStorage')) {
    return
  }

  // TODO: after 14 days we can be sure the id is always available and search by { id, type } only
  const newPreviousSearches = filter(getPreviousSearches(), (s) => {
    if (id) {
      return s.type !== type || s.id !== id
    }
    return s.type !== type || s.title !== title
  })
  localStorage.setItem(LS_SITE_SEARCH_PREVIOUS_SEARCHES, JSON.stringify(newPreviousSearches))

  try {
    events.emit('storage', new StorageEvent('storage', { key: LS_SITE_SEARCH_PREVIOUS_SEARCHES }))
  } catch (e) {
    // ignore error
  }
}

export const usePreviousSearches = () => {
  const [previousSearches, setPreviousSearches] = useState(getPreviousSearches())

  useEffect(() => {
    if (!storageAvailable('localStorage')) {
      return noop
    }

    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key !== LS_SITE_SEARCH_PREVIOUS_SEARCHES) {
        return
      }

      console.log('[search] previoussearches: local storage updated')

      setPreviousSearches(getPreviousSearches())
    }

    events.on('storage', handleStorageEvent)
    window.addEventListener('storage', handleStorageEvent)

    return () => {
      events.off('storage', handleStorageEvent)
      window.removeEventListener('storage', handleStorageEvent)
    }
  }, [])

  return previousSearches
}
