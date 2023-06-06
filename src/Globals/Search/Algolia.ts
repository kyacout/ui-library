import { MultipleQueriesQuery } from '@algolia/client-search'
import algoliasearch from 'algoliasearch/lite'
import getConfig from 'next/config'

import { Name } from '@Globals/Resource'

const { publicRuntimeConfig } = getConfig()

export const client = algoliasearch(
  publicRuntimeConfig.algoliaAppID,
  publicRuntimeConfig.algoliaAPIKey,
)

interface AlgoliaHighlightResult {
  fullyHighlighted: boolean
  matchLevel: 'full'
  matchedWords: string[]
  value: string
}

interface AlgoliaCommon {
  _highlightResult: Record<string, AlgoliaHighlightResult>
  objectID: string
}

export interface AlgoliaBrand extends AlgoliaCommon {
  slug: string
  title: string
}

export interface AlgoliaCategory extends AlgoliaCommon {
  depth: number
  parentTitle: string
  slug: string
  title: string
}

export interface AlgoliaProduct extends AlgoliaCommon {
  basePrice: number
  beforePrice: number
  brand: string
  categoryIDs: number[]
  categoryPath: string
  description: string
  discountPercentage: number
  hoverImage: string
  isInStock: boolean
  isNew: boolean
  price: number
  primaryImage: string
  qtySold: number
  slug: string
  title: string
}

type AlgoliaSearchResult = AlgoliaBrand | AlgoliaCategory | AlgoliaProduct

export interface SearchResults {
  brands: AlgoliaBrand[]
  categories: AlgoliaCategory[]
  products: AlgoliaProduct[]
}

// Algolia is caching requests (not responses), so multiple calls to search with the same parameters
// will not result in excessive network requests to algolia
export const search = async (storeName: string, query: string): Promise<SearchResults> => {
  const storeID = new Name(storeName).id || '8'

  const queries: MultipleQueriesQuery[] = [
    {
      indexName: `categories_${storeID}`,
      params: {
        hitsPerPage: 11,
        optionalWords: query,
      },
      query,
    },
    {
      indexName: `products_${storeID}`,
      params: {
        filters: 'isInStock=1',
        hitsPerPage: window.innerHeight > 768 ? 8 : 6,
        optionalWords: query,
      },
      query,
    },
    {
      indexName: 'brands',
      params: {
        hitsPerPage: 6,
        optionalWords: query,
      },
      query,
    },
  ]

  const response = await client.search<AlgoliaSearchResult>(queries)

  const [
    { hits: categoryItems },
    { hits: productItems },
    { hits: brandItems },
  ] = response.results

  return {
    brands: <AlgoliaBrand[]>brandItems,
    categories: <AlgoliaCategory[]>categoryItems,
    products: <AlgoliaProduct[]>productItems,
  }
}
