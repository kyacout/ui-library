import React, {
  KeyboardEvent,
  useCallback,
  useContext,
  useRef,
} from 'react'

import SearchIcon from '@Assets/SVG/Search'
import { ResetAdornment } from '@Components/FormElements/Adornments/Reset'
import { TextField } from '@Components/FormElements/UI/TextField'
import { SVGIcon } from '@Components/Icons'
import cssShared from '@Components/Search/SelectedItem.styl'
import { handleEvent } from '@Events/Manager'
import { NavigationEvent } from '@Events/Navigation'
import { SearchContext } from '@Globals/Search/Context'
import { addSearchFromFreeText } from '@Globals/Search/PreviousSearches'
import { storeURL } from '@Globals/Store'
import { useTranslation } from '@Globals/Translations'

import { useGoTo } from './GoTo'
import css from './index.styl'

export const SearchInput = () => {
  const { t } = useTranslation()
  const {
    query,
    selection,
    setActive,
    setQuery,
  } = useContext(SearchContext)

  const goTo = useGoTo()

  const inputRef = useRef(null)
  const searchURL = new URL(storeURL('catalogsearch/result'))

  const resetInput = (e) => {
    // Disable window click handler from the context when resetting the input
    e.stopPropagation()

    setQuery('')
    inputRef.current?.focus()
  }

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
      inputRef.current?.blur()
      setActive(false)
    }

    // Handle previous searches
    if (query.length < 2) {
      if (e.key === 'Enter' || e.keyCode === 13) {
        if (selection.type === 'input') {
          return
        }

        const activeElement: HTMLElement = document.querySelector(
          `.-j-desktop-header-search-wrap .${cssShared.SelectedItem}`,
        )
        if (activeElement?.click) {
          activeElement.click()
        }
      }

      if (e.key === 'ArrowUp' || e.keyCode === 38) {
        console.log('[search] previoussearches: arrow up')

        e.preventDefault()

        switch (selection.type) {
          case 'input':
            goTo.previousSearchLast()
            return
          case 'previoussearch':
            if (goTo.previousSearchPrevious(selection.id)) {
              return
            }
            goTo.input()
            return
          default:
            return
        }
      }

      if (e.key === 'ArrowDown' || e.keyCode === 40) {
        console.log('[search] previoussearches: arrow down')

        e.preventDefault()

        switch (selection.type) {
          case 'input':
            goTo.previousSearchFirst()
            return
          case 'previoussearch':
            if (goTo.previousSearchNext(selection.id)) {
              return
            }
            goTo.input()
            return
          default:
            return
        }
      }

      if (e.key === 'ArrowLeft' || e.keyCode === 37) {
        console.log('[search] previoussearches: arrow left')

        if (selection.type === 'input') {
          return
        }

        e.preventDefault()
      }

      if (e.key === 'ArrowRight' || e.keyCode === 39) {
        console.log('[search] previoussearches: arrow right')

        if (selection.type === 'input') {
          return
        }

        e.preventDefault()
      }
    }

    // Handle query results
    if (query.length >= 2) {
      if (e.key === 'Enter' || e.keyCode === 13) {
        if (selection.type === 'input') {
          searchURL.searchParams.set('q', query)
          addSearchFromFreeText(query, searchURL.toString())
          handleEvent(
            new NavigationEvent({
              attributes: {
                dest_page_type: 'searchresults',
                dest_page_type_id: '',
                search_query: query,
                source_id: 'site_search_results',
              },
              eventName: 'nav_link_click',
            }),
            true,
          )
          window.location.href = searchURL.toString()
          return
        }

        const activeElement: HTMLElement = document.querySelector(
          `.-j-desktop-header-search-wrap .${cssShared.SelectedItem}`,
        )
        if (activeElement?.click) {
          activeElement.click()
        }
      }

      if (e.key === 'ArrowUp' || e.keyCode === 38) {
        console.log('[search] results: arrow up')

        e.preventDefault()

        switch (selection.type) {
          case 'brand':
            goTo.input()
            return
          case 'category':
            if (goTo.categoryPrevious(selection.objectID)) {
              return
            }
            goTo.input()
            return
          case 'freetext':
            if (goTo.categoryLast()) {
              return
            }
            goTo.input()
            return
          case 'input':
            goTo.freetext()
            return
          case 'product':
            if (goTo.productPrevious(selection.objectID) || goTo.brandFirst()) {
              return
            }
            goTo.input()
            return
          default:
            return
        }
      }

      if (e.key === 'ArrowDown' || e.keyCode === 40) {
        console.log('[search] results: arrow down')

        e.preventDefault()

        switch (selection.type) {
          case 'brand':
            if (goTo.productFirst()) {
              return
            }
            goTo.input()
            return
          case 'category':
            if (goTo.categoryNext(selection.objectID)) {
              return
            }
            goTo.freetext()
            return
          case 'freetext':
            goTo.input()
            return
          case 'input':
            if (goTo.categoryFirst()) {
              return
            }
            goTo.freetext()
            return
          case 'product':
            if (goTo.productNext(selection.objectID)) {
              return
            }
            goTo.input()
            return
          default:
            return
        }
      }

      if (e.key === 'ArrowLeft' || e.keyCode === 37) {
        console.log('[search] results: arrow left')

        if (selection.type === 'input') {
          return
        }

        e.preventDefault()

        switch (selection.type) {
          case 'brand':
            if (goTo.brandPrevious(selection.objectID) || goTo.categoryFirst()) {
              return
            }
            goTo.freetext()
            return
          case 'category':
          case 'freetext':
            if (goTo.brandLast()) {
              return
            }
            goTo.productFirst()
            return
          case 'product':
            if (goTo.categoryFirst()) {
              return
            }
            goTo.freetext()
            return
          default:
            return
        }
      }

      if (e.key === 'ArrowRight' || e.keyCode === 39) {
        console.log('[search] results: arrow right')

        if (selection.type === 'input') {
          return
        }

        e.preventDefault()

        switch (selection.type) {
          case 'brand':
            if (goTo.brandNext(selection.objectID) || goTo.categoryFirst()) {
              return
            }
            goTo.freetext()
            return
          case 'category':
          case 'freetext':
            if (goTo.brandFirst()) {
              return
            }
            goTo.productFirst()
            return
          case 'product':
            if (goTo.categoryFirst()) {
              return
            }
            goTo.freetext()
            return
          default:
            return
        }
      }
    }
  }, [goTo, selection])

  return (
    <div className={css.root}>
      <TextField
        adornments={{
          end: query && <ResetAdornment onClick={resetInput} />,
          start: <SVGIcon icon={SearchIcon} size="100%" />,
        }}
        autoComplete="off"
        label={`${t('header:SEARCH_FIELD_PLACEHOLDER_TEXT')}...`}
        onChange={e => setQuery(e.target.value || '')}
        onFocus={() => setActive(true)}
        onKeyDown={onKeyDown}
        ref={inputRef}
        value={query}
        variant="underlined"
        withoutLabelAnimation
        wrapperClassName="-j-site-search-desktop"
      />
    </div>
  )
}
