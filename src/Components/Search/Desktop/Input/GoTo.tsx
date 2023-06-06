import findIndex from 'lodash/findIndex'
import first from 'lodash/first'
import last from 'lodash/last'
import { useCallback, useContext } from 'react'

import { SearchContext } from '@Globals/Search/Context'

export const useGoTo = () => {
  const { previousSearches, results, setSelection } = useContext(SearchContext)

  // Brand
  const brandFirst = useCallback(() => {
    console.log('[search] results: attempting to select first brand')
    const brand = first(results?.brands)

    if (brand?.objectID) {
      setSelection({ objectID: brand.objectID, type: 'brand' })
      return true
    }

    return false
  }, [results])
  const brandLast = useCallback(() => {
    console.log('[search] results: attempting to select last brand')
    const brand = last(results?.brands)

    if (brand?.objectID) {
      setSelection({ objectID: brand.objectID, type: 'brand' })
      return true
    }

    return false
  }, [results])
  const brandNext = useCallback((objectID: string) => {
    console.log('[search] results: attempting to select next brand')
    const index = findIndex(results?.brands, ['objectID', objectID])
    const brand = results?.brands?.[index + 1]

    if (brand?.objectID) {
      setSelection({ objectID: brand.objectID, type: 'brand' })
      return true
    }

    return false
  }, [results])
  const brandPrevious = useCallback((objectID: string) => {
    console.log('[search] results: attempting to select previous brand')
    const index = findIndex(results?.brands, ['objectID', objectID])
    const brand = results?.brands?.[index - 1]

    if (brand?.objectID) {
      setSelection({ objectID: brand.objectID, type: 'brand' })
      return true
    }

    return false
  }, [results])

  // Category
  const categoryFirst = useCallback(() => {
    console.log('[search] results: attempting to select first category')
    const category = first(results?.categories)

    if (category?.objectID) {
      setSelection({ objectID: category.objectID, type: 'category' })
      return true
    }

    return false
  }, [results])
  const categoryLast = useCallback(() => {
    console.log('[search] results: attempting to select last category')
    const category = last(results?.categories)

    if (category?.objectID) {
      setSelection({ objectID: category.objectID, type: 'category' })
      return true
    }

    return false
  }, [results])
  const categoryNext = useCallback((objectID: string) => {
    console.log('[search] results: attempting to select next category')
    const index = findIndex(results?.categories, ['objectID', objectID])
    const category = results?.categories?.[index + 1]

    if (category?.objectID) {
      setSelection({ objectID: category.objectID, type: 'category' })
      return true
    }

    return false
  }, [results])
  const categoryPrevious = useCallback((objectID: string) => {
    console.log('[search] results: attempting to select previous category')
    const index = findIndex(results?.categories, ['objectID', objectID])
    const category = results?.categories?.[index - 1]

    if (category?.objectID) {
      setSelection({ objectID: category.objectID, type: 'category' })
      return true
    }

    return false
  }, [results])

  // Freetext
  const freetext = useCallback(() => {
    console.log('[search] results: selecting freetext')
    setSelection({ type: 'freetext' })
    return true
  }, [results])

  // Input
  const input = useCallback(() => {
    console.log('[search] selecting input')
    setSelection({ type: 'input' })
    return true
  }, [results])

  // PreviousSearch
  const previousSearchFirst = useCallback(() => {
    console.log('[search] results: attempting to select first previousSearch')
    const previousSearch = first(previousSearches)

    if (previousSearch?.id) {
      setSelection({ id: previousSearch.id, type: 'previoussearch' })
      return true
    }

    return false
  }, [results])
  const previousSearchLast = useCallback(() => {
    console.log('[search] results: attempting to select last previousSearch')
    const previousSearch = last(previousSearches)

    if (previousSearch?.id) {
      setSelection({ id: previousSearch.id, type: 'previoussearch' })
      return true
    }

    return false
  }, [results])
  const previousSearchNext = useCallback((id: string) => {
    console.log('[search] results: attempting to select next previousSearch')
    const index = findIndex(previousSearches, ['id', id])
    const previousSearch = previousSearches?.[index + 1]

    if (previousSearch?.id) {
      setSelection({ id: previousSearch.id, type: 'previoussearch' })
      return true
    }

    return false
  }, [results])
  const previousSearchPrevious = useCallback((id: string) => {
    console.log('[search] results: attempting to select previous previousSearch')
    const index = findIndex(previousSearches, ['id', id])
    const previousSearch = previousSearches?.[index - 1]

    if (previousSearch?.id) {
      setSelection({ id: previousSearch.id, type: 'previoussearch' })
      return true
    }

    return false
  }, [results])

  // Product
  const productFirst = useCallback(() => {
    console.log('[search] results: attempting to select first product')
    const product = first(results?.products)

    if (product?.objectID) {
      setSelection({ objectID: product.objectID, type: 'product' })
      return true
    }

    return false
  }, [results])
  const productNext = useCallback((objectID: string) => {
    console.log('[search] results: attempting to select next product')
    const index = findIndex(results?.products, ['objectID', objectID])
    const product = results?.products?.[index + 1]

    if (product?.objectID) {
      setSelection({ objectID: product.objectID, type: 'product' })
      return true
    }

    return false
  }, [results])
  const productPrevious = useCallback((objectID: string) => {
    console.log('[search] results: attempting to select previous product')
    const index = findIndex(results?.products, ['objectID', objectID])
    const product = results?.products?.[index - 1]

    if (product?.objectID) {
      setSelection({ objectID: product.objectID, type: 'product' })
      return true
    }

    return false
  }, [results])

  return {
    brandFirst,
    brandLast,
    brandNext,
    brandPrevious,
    categoryFirst,
    categoryLast,
    categoryNext,
    categoryPrevious,
    freetext,
    input,
    previousSearchFirst,
    previousSearchLast,
    previousSearchNext,
    previousSearchPrevious,
    productFirst,
    productNext,
    productPrevious,
  }
}
