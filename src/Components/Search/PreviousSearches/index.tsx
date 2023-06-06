import clsx from 'clsx'
import map from 'lodash/map'
import React, { FC } from 'react'

import AngleRight from '@Assets/SVG/AngleRight'
import ClockIcon from '@Assets/SVG/Clock'
import CloseIcon from '@Assets/SVG/Close'
import { SVGIcon } from '@Components/Icons'
import { Link } from '@Components/Link'
import cssShared from '@Components/Search/SelectedItem.styl'
import { NavigationEvent } from '@Events/Navigation'
import {
  addPreviousSearch,
  PreviousSearch,
  PreviousSearchItemTypes,
  removePreviousSearchItem,
} from '@Globals/Search/PreviousSearches'
import { SearchSelection } from '@Globals/Search/Selection'
import { redirectURL, storeURL } from '@Globals/Store'
import { useTranslation } from '@Globals/Translations'

import css from './index.styl'

interface PreviousSearchesProps {
  previousSearches: PreviousSearch[]
  selection: SearchSelection
}

const SearchText: FC<PreviousSearch> = ({
  brand,
  parentTitle,
  title,
  type,
}: PreviousSearch) => {
  if (type === PreviousSearchItemTypes.FreeText) {
    return <span>{`"${title}"`}</span>
  }
  if (type === PreviousSearchItemTypes.Product) {
    return <span>{`${brand} - ${title}`}</span>
  }
  if (type === PreviousSearchItemTypes.Category && parentTitle) {
    return (
      <span>
        {parentTitle}
        <div className={css.DivideIcon}>
          <SVGIcon icon={AngleRight} size="8px" />
        </div>
        <span>{title}</span>
      </span>
    )
  }
  return <span>{title}</span>
}

interface PreviousSearchItemProps extends PreviousSearch {
  selected: boolean
}

const PreviousSearchItem: FC<PreviousSearchItemProps> = (
  {
    selected,
    ...previousSearch
  }: PreviousSearchItemProps,
) => {
  const {
    id,
    slug,
    title,
    type,
  } = previousSearch
  const getURL = () => {
    if (type === PreviousSearchItemTypes.FreeText) {
      return storeURL('catalogsearch/result/', new URLSearchParams({ q: title }))
    }
    if (type === PreviousSearchItemTypes.Brand) {
      return storeURL(slug)
    }
    return redirectURL(type, id, true)
  }

  return (
    <Link
      className={clsx(
        css.PreviousSearchesItem,
        selected && cssShared.SelectedItem,
      )}
      event={new NavigationEvent({
        attributes: {
          dest_page_type: type === PreviousSearchItemTypes.FreeText ? 'searchresults' : type,
          dest_page_type_id: type === PreviousSearchItemTypes.FreeText ? '' : id || '',
          search_query: '',
          source_id: 'site_search_previous_searches',
        },
        eventName: 'nav_link_click',
      })}
      href={getURL()}
      onClick={() => addPreviousSearch(previousSearch)}
    >
      <div className={css.ClockIcon}>
        <SVGIcon icon={ClockIcon} size="16px" />
      </div>
      <div className={css.TextWrap}>
        <div className={css.InnerText}>
          <SearchText {...previousSearch} />
        </div>
      </div>
      <div
        className={css.RemoveIcon}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          removePreviousSearchItem(type, id, title)
        }}
      >
        <SVGIcon icon={CloseIcon} />
      </div>
    </Link>
  )
}

export const PreviousSearches: FC<PreviousSearchesProps> = ({
  previousSearches,
  selection,
}: PreviousSearchesProps) => {
  const { t } = useTranslation()

  return (
    <div className={css.root} onClick={e => e.stopPropagation()}>
      <span className={css.Title}>{t('header:PREVIOUS_SEARCHES')}</span>
      {map(previousSearches, p => (
        <PreviousSearchItem
          key={`${p.type}: ${p.slug}`}
          selected={selection.type === 'previoussearch' && selection.id === p.id}
          {...p}
        />
      ))}
    </div>
  )
}
