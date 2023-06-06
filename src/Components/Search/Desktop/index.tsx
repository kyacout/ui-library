import clsx from 'clsx'
import isEmpty from 'lodash/isEmpty'
import React, { FC, useContext, useEffect } from 'react'

import { PreviousSearches } from '@Components/Search/PreviousSearches'
import { QueryResults } from '@Components/Search/QueryResults'
import { SearchContext } from '@Globals/Search/Context'

import css from './index.styl'

interface SearchResultsProps {
  onBackdropChange: (isOpen: boolean) => void
}

export const DesktopSearchResults: FC<SearchResultsProps> = ({
  onBackdropChange,
}: SearchResultsProps) => {
  const {
    active,
    previousSearches,
    query,
    results,
    selection,
    setActive,
  } = useContext(SearchContext)

  const hasQuery = active && query?.length >= 2
  const hasPreviousSearches = active && !isEmpty(previousSearches)

  useEffect(() => {
    if (hasQuery) {
      onBackdropChange(true)
      return
    }

    if (hasPreviousSearches) {
      onBackdropChange(true)
      return
    }

    onBackdropChange(false)
  }, [hasQuery, hasPreviousSearches])

  if (hasQuery) {
    return (
      <div
        className={clsx(css.root, '-j-desktop-header-search-wrap')}
        onClick={() => setActive(false)}
      >
        <QueryResults query={query} results={results} selection={selection} />
      </div>
    )
  }

  if (hasPreviousSearches) {
    return (
      <div
        className={clsx(css.root, '-j-desktop-header-search-wrap')}
        onClick={() => setActive(false)}
      >
        <PreviousSearches previousSearches={previousSearches} selection={selection} />
      </div>
    )
  }

  return null
}
