import clsx from 'clsx'
import isEmpty from 'lodash/isEmpty'
import React, {
  FC,
  useCallback,
  useContext,
  useRef,
} from 'react'

import CloseIcon from '@Assets/SVG/Close'
import SearchIcon from '@Assets/SVG/Search'
import { SVGIcon } from '@Components/Icons'
import { PreviousSearches } from '@Components/Search/PreviousSearches'
import { QueryResults } from '@Components/Search/QueryResults'
import { handleEvent } from '@Events/Manager'
import { NavigationEvent } from '@Events/Navigation'
import { SearchContext } from '@Globals/Search/Context'
import { addSearchFromFreeText } from '@Globals/Search/PreviousSearches'
import { storeURL } from '@Globals/Store'
import { useTranslation } from '@Globals/Translations'

import css from './index.styl'

const MainBody: FC = () => {
  const {
    previousSearches,
    query,
    results,
    selection,
  } = useContext(SearchContext)

  const hasQuery = query?.length >= 2
  const hasPreviousSearches = !isEmpty(previousSearches)

  if (hasQuery) {
    return <QueryResults query={query} results={results} selection={selection} />
  }
  if (hasPreviousSearches) {
    return <PreviousSearches previousSearches={previousSearches} selection={selection} />
  }
  return null
}

export const MobileSearchResults: FC = () => {
  const { t } = useTranslation()
  const searchURL = new URL(storeURL('catalogsearch/result'))
  const inputRef = useRef(null)

  const {
    active,
    query,
    setActive,
    setQuery,
  } = useContext(SearchContext)

  const enter = useCallback((e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      if (query.length > 1) {
        searchURL.searchParams.set('q', query)
        addSearchFromFreeText(query, searchURL.toString())
        setActive(false)
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
      }
    }
  }, [query])

  if (!active) {
    return null
  }

  return (
    <div className={clsx(css.root, '-j-mobile-header-search-wrap')}>
      <div className={css.header}>
        <div className={css.searchIcon}>
          <SVGIcon icon={SearchIcon} size="20px" />
        </div>
        <input
          autoFocus // eslint-disable-line jsx-a11y/no-autofocus
          onChange={e => setQuery(e.target.value || '')}
          onKeyDown={enter}
          placeholder={t('header:SEARCH_FIELD_PLACEHOLDER_TEXT')}
          ref={inputRef}
          value={query}
        />
        {query && (
          <div
            className={css.clearIcon}
            onClick={(e) => {
              e.stopPropagation()
              if (inputRef?.current) {
                setQuery('')
                inputRef.current.value = ''
                inputRef.current.focus()
              }
            }}
          >
            <SVGIcon icon={CloseIcon} size="10px" />
          </div>
        )}
        <div className={css.cancel} onClick={() => setActive(false)}>
          <span>{t('header:CANCEL')}</span>
        </div>
      </div>
      <MainBody />
    </div>
  )
}
