import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { SectionPagesList } from '@Components/Info/SectionPagesList'
import { Item } from '@Protos/info/info_pb'

import css from './index.styl'

export interface SearchSuggestionsProps {
  searchParam?: string
  searchResults: Item.AsObject[]
}

export const SearchSuggestions: FC<SearchSuggestionsProps> = ({
  searchParam,
  searchResults,
}: SearchSuggestionsProps) => {
  const { t } = useTranslation()

  if (!searchResults || searchResults.length === 0) {
    return (
      <div className={css.noPagesToShow}>
        <p>{t('info:INFO_CENTER_SEARCH_RESULT_NO_HITS_LABEL', { arg1: searchParam })}</p>
      </div>
    )
  }

  return (
    <div className={css.root}>
      <SectionPagesList items={searchResults} />
    </div>
  )
}
