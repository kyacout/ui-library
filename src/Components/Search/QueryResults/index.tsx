import clsx from 'clsx'
import escapeRegExp from 'lodash/escapeRegExp'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import React, {
  FC,
  Fragment,
  memo,
  ReactNode,
  useContext,
} from 'react'

import AngleRight from '@Assets/SVG/AngleRight'
import ArrowRightThinIcon from '@Assets/SVG/ArrowRightThin'
import SearchIcon from '@Assets/SVG/Search'
import { CloudinaryImage } from '@Components/CloudinaryImage'
import { SVGIcon } from '@Components/Icons'
import { Link } from '@Components/Link'
import cssShared from '@Components/Search/SelectedItem.styl'
import { NavigationEvent } from '@Events/Navigation'
import { MetadataContext } from '@Globals/Metadata'
import { formatPrice } from '@Globals/PriceHelpers'
import {
  AlgoliaBrand,
  AlgoliaCategory,
  AlgoliaProduct,
  SearchResults,
} from '@Globals/Search/Algolia'
import { addPreviousSearch, PreviousSearchItemTypes } from '@Globals/Search/PreviousSearches'
import { SearchSelection } from '@Globals/Search/Selection'
import { storeURL } from '@Globals/Store'
import { useTranslation } from '@Globals/Translations'

import css from './index.styl'

interface HighlightTitleProps {
  query: string
  title: string
}

interface QueryResultsProps {
  query: string
  results: SearchResults
  selection: SearchSelection
}

interface PriceProps {
  beforePrice: number,
  price: number,
}

interface SearchItemProps {
  query: string
  selected: boolean
}

type BrandItemProps = AlgoliaBrand & SearchItemProps
type CategoryItemProps = AlgoliaCategory & SearchItemProps
type CategoryItemBodyProps = Omit<CategoryItemProps, 'selected' | 'slug' | 'objectID'>
type ProductItemProps = AlgoliaProduct & SearchItemProps

const HighlightTitle: FC<HighlightTitleProps> = memo(({ query, title }: HighlightTitleProps) => {
  const re = new RegExp(escapeRegExp(query), 'gi')
  let match = re.exec(title)
  let i = 0
  const titleParts: ReactNode[] = []
  while (match !== null) {
    const end = match.index + match[0].length
    if (i !== match.index) {
      titleParts.push(<Fragment key={i}>{title.substring(i, match.index)}</Fragment>)
    }
    titleParts.push(<em key={match.index}>{title.substring(match.index, end)}</em>)
    i = end
    match = re.exec(title)
  }
  titleParts.push(<Fragment key={i}>{title.substring(i, title.length)}</Fragment>)

  // in case no matches found
  if (titleParts.length === 0) {
    titleParts.push(title)
  }

  return <>{titleParts}</>
})

const BrandItem: FC<BrandItemProps> = ({
  objectID,
  query,
  selected,
  slug,
  title,
}: BrandItemProps) => (
  <Link
    className={clsx(
      css.SearchResultsBrandItem,
      selected && cssShared.SelectedItem,
    )}
    event={new NavigationEvent({
      attributes: {
        dest_page_type: 'brand',
        dest_page_type_id: objectID,
        search_query: query,
        source_id: 'site_search_results',
      },
      eventName: 'nav_link_click',
    })}
    href={storeURL(slug)}
    onClick={() => addPreviousSearch({
      id: objectID,
      slug,
      title,
      type: PreviousSearchItemTypes.Brand,
    })}
  >
    <div className={css.ArrowIcon}>
      <SVGIcon icon={ArrowRightThinIcon} size="16px" />
    </div>
    <span><HighlightTitle query={query} title={title} /></span>
  </Link>
)

const CategoryItemBody: FC<CategoryItemBodyProps> = ({
  depth,
  parentTitle,
  query,
  title,
}: CategoryItemBodyProps) => {
  if (depth === 1) {
    return (
      <div className={css.TextWrapper}>
        <div className={css.InnerText}>
          <span><HighlightTitle query={query} title={title} /></span>
        </div>
      </div>
    )
  }
  return (
    <div className={css.TextWrapper}>
      <div className={css.InnerText}>
        <span>{parentTitle}</span>
        <div className={css.DivideIcon}>
          <SVGIcon icon={AngleRight} size="8px" />
        </div>
        <span><HighlightTitle query={query} title={title} /></span>
      </div>
    </div>
  )
}

const CategoryItem: FC<CategoryItemProps> = ({
  objectID,
  parentTitle,
  query,
  selected,
  slug,
  title,
  ...props
}: CategoryItemProps) => (
  <Link
    className={clsx(
      css.SearchResultsCategoriesItem,
      selected && cssShared.SelectedItem,
    )}
    event={new NavigationEvent({
      attributes: {
        dest_page_type: 'category',
        dest_page_type_id: objectID,
        search_query: query,
        source_id: 'site_search_results',
      },
      eventName: 'nav_link_click',
    })}
    href={storeURL(slug)}
    onClick={() => addPreviousSearch({
      id: objectID,
      parentTitle,
      slug,
      title,
      type: PreviousSearchItemTypes.Category,
    })}
  >
    <div className={css.arrowRightThinIconWrapper}>
      <SVGIcon icon={ArrowRightThinIcon} size="16px" />
    </div>
    <CategoryItemBody
      parentTitle={parentTitle}
      query={query}
      title={title}
      {...props}
    />
  </Link>
)

const Price: FC<PriceProps> = ({ beforePrice, price }: PriceProps) => {
  const { store } = useContext(MetadataContext)
  const storeName = store?.name
  const storeLocaleCode = store?.config?.localeCode

  if (beforePrice) {
    return (
      <>
        <div className={css.BeforePrice}>
          {formatPrice(storeName, storeLocaleCode, beforePrice)}
        </div>
        <div className={css.DiscountPrice}>
          {formatPrice(storeName, storeLocaleCode, price)}
        </div>
      </>
    )
  }

  return (
    <div className={css.NormalPrice}>
      {formatPrice(storeName, storeLocaleCode, price)}
    </div>
  )
}

const ProductItem: FC<ProductItemProps> = ({
  beforePrice,
  brand,
  objectID,
  price,
  primaryImage,
  query,
  selected,
  slug,
  title,
}: ProductItemProps) => (
  <Link
    className={clsx(
      css.SearchResultsProductItem,
      selected && cssShared.SelectedItem,
    )}
    event={new NavigationEvent({
      attributes: {
        dest_page_type: 'product',
        dest_page_type_id: objectID,
        search_query: query,
        source_id: 'site_search_results',
      },
      eventName: 'nav_link_click',
    })}
    href={storeURL(slug)}
    onClick={() => addPreviousSearch({
      brand,
      id: objectID,
      slug,
      title,
      type: PreviousSearchItemTypes.Product,
    })}
  >
    <div className={css.ImgWrap}>
      <CloudinaryImage
        alt={`${title} - search item`}
        options={{ height: 90, width: 90 }}
        path={primaryImage}
      />
    </div>
    <div className={css.InfoWrap}>
      <span>
        {`${brand} - `}
        <HighlightTitle query={query} title={title} />
      </span>
    </div>
    <div className={css.PriceWrap}>
      <Price beforePrice={beforePrice} price={price} />
    </div>
  </Link>
)

export const QueryResults: FC<QueryResultsProps> = (
  {
    query,
    results,
    selection,
  }: QueryResultsProps,
) => {
  const { brands, categories, products } = results
  const { t } = useTranslation()

  const searchAllURL = storeURL('catalogsearch/result', new URLSearchParams({ q: query }))

  return (
    <div className={css.root} onClick={e => e.stopPropagation()}>
      <div className={css.SearchResultsCategories}>
        {map(categories, c => (
          <CategoryItem
            key={c.objectID}
            query={query}
            selected={selection.type === 'category' && selection.objectID === c.objectID}
            {...c}
          />
        ))}
        <Link
          className={clsx(
            css.SearchResultsCategoriesItem,
            css.FreeText,
            selection.type === 'freetext' && cssShared.SelectedItem,
          )}
          event={new NavigationEvent({
            attributes: {
              dest_page_type: 'searchresults',
              dest_page_type_id: '',
              search_query: query,
              source_id: 'site_search_results',
            },
            eventName: 'nav_link_click',
          })}
          href={searchAllURL}
        >
          <div className={css.searchIconWrapper}>
            <SVGIcon icon={SearchIcon} size="16px" />
          </div>
          <b>{query}</b>
          <div className={css.searchAllArrowRightThinIconWrapper}>
            <SVGIcon icon={ArrowRightThinIcon} size="12px" />
          </div>
          <span className={css.SearchAll}>{t('header:SEARCH_ALL')}</span>
        </Link>
      </div>
      <div className={css.BrandAndCategoryWrapper}>
        <div className={css.Brands}>
          <span className={css.Title}>{t('header:BRANDS')}</span>
          {isEmpty(brands)
            ? <div className={css.NothingToShowText}>{t('header:NO_BRANDS_TO_SHOW')}</div>
            : map(brands, b => (
              <BrandItem
                key={b.objectID}
                query={query}
                selected={selection.type === 'brand' && selection.objectID === b.objectID}
                {...b}
              />
            ))}
        </div>
        <div className={css.Products}>
          <span className={css.Title}>{t('header:PRODUCTS')}</span>
          {isEmpty(products)
            ? <div className={css.NothingToShowText}>{t('header:NO_PRODUCTS_TO_SHOW')}</div>
            : map(products, p => (
              <ProductItem
                key={p.objectID}
                query={query}
                selected={selection.type === 'product' && selection.objectID === p.objectID}
                {...p}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
