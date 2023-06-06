import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import noop from 'lodash/noop'
import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { handleEvent } from '@Events/Manager'
import { OtherEvent } from '@Events/Other'
import { getClosestWithClassName } from '@Globals/Elements'
import { MetadataContext } from '@Globals/Metadata'
import { search as searchCore, SearchResults } from '@Globals/Search/Algolia'
import {
  PreviousSearch,
  usePreviousSearches,
} from '@Globals/Search/PreviousSearches'
import { SearchSelection } from '@Globals/Search/Selection'

interface Search {
  active: boolean
  previousSearches: PreviousSearch[]
  query: string
  results: SearchResults
  selection: SearchSelection
  setActive: (isActive: boolean) => void
  setQuery: (query: string) => void
  setSelection: (selection: SearchSelection) => void
}

interface SearchProviderProps {
  children: ReactNode
}

interface SearchState {
  active: boolean
  query: string
  results: SearchResults
  selection: SearchSelection
}

const defaultState: SearchState = {
  active: false,
  query: '',
  results: {
    brands: [],
    categories: [],
    products: [],
  },
  selection: {
    type: 'input',
  },
}

const defaultValue: Search = {
  active: false,
  previousSearches: [],
  query: '',
  results: {
    brands: [],
    categories: [],
    products: [],
  },
  selection: {
    type: 'input',
  },
  setActive: noop,
  setQuery: noop,
  setSelection: noop,
}

export const SearchContext = createContext<Search>(defaultValue)
export const SearchConsumer = SearchContext.Consumer
export const SearchProvider: FC<SearchProviderProps> = (
  {
    children,
  }: SearchProviderProps,
) => {
  const { store } = useContext(MetadataContext)
  const [
    {
      active: currentActive,
      query: currentQuery,
      results: currentResults,
      selection: currentSelection,
    },
    setState,
  ] = useState<SearchState>(defaultState)
  const previousSearches = usePreviousSearches()

  useEffect(
    () => {
      if (!store?.name) {
        return noop
      }

      if (currentQuery.length < 2) {
        return noop
      }

      let active = true

      const performSearch = async () => {
        if (!active) {
          return
        }

        const results = await searchCore(store?.name, currentQuery)

        if (!active) {
          return
        }

        setState((prev) => {
          const state = {
            ...prev,
            results,
          }

          if (isEqual(prev, state)) {
            return prev
          }

          return {
            ...state,
            selection: {
              type: 'input',
            },
          }
        })
      }

      performSearch()

      return () => {
        active = false
      }
    },
    [store?.name, currentQuery],
  )

  const resetState = useCallback(
    (query: string) => setState((prev) => {
      const state = {
        ...prev,
        ...defaultState,
        active: prev.active,
        query,
      }

      if (isEqual(prev, state)) {
        return prev
      }

      return state
    }),
    [setState],
  )

  const setActive = useCallback(
    (active: boolean) => setState(
      (prev) => {
        if (prev.active === active) {
          return prev
        }

        return {
          ...prev,
          active,
          selection: {
            type: 'input',
          },
        }
      },
    ),
    [setState],
  )

  const setQuery = useCallback(
    (query: string) => {
      if (!store?.name) {
        resetState(query)
        return
      }

      if (query.length < 2) {
        resetState(query)
        return
      }

      setState(prev => ({ ...prev, query }))
    },
    [store?.name, resetState, setState],
  )

  const setSelection = useCallback(
    (selection: SearchSelection) => setState(
      (prev) => {
        if (isEqual(prev.selection, selection)) {
          return prev
        }

        return { ...prev, selection }
      },
    ),
    [setState],
  )

  // When active, handle window click events.
  // When clicking outside of any search region, deactivate search.
  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    if (!currentActive) {
      return undefined
    }

    const handler = (e) => {
      if (getClosestWithClassName(e.target, '-j-site-search-desktop')) {
        return
      }

      if (getClosestWithClassName(e.target, '-j-desktop-header-search-wrap')) {
        return
      }

      if (getClosestWithClassName(e.target, '-j-mobile-header-search-wrap')) {
        return
      }

      setActive(false)
    }

    window.addEventListener('click', handler)

    return () => {
      window.removeEventListener('click', handler)
    }
  }, [currentActive])

  // Send MParticle event when search becomes active
  useEffect(() => {
    if (!currentActive) {
      return
    }

    handleEvent(new OtherEvent({
      attributes: {
        has_previous_search: !isEmpty(previousSearches),
      },
      eventName: 'search_start',
    }))
  }, [currentActive])

  return (
    <SearchContext.Provider
      value={{
        active: currentActive,
        previousSearches,
        query: currentQuery,
        results: currentResults,
        selection: currentSelection,
        setActive,
        setQuery,
        setSelection,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
