import cloneDeep from 'lodash/cloneDeep'
import filter from 'lodash/filter'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import React, {
  createContext,
  FC,
  ReactNode,
  useMemo,
} from 'react'

import { Category } from '@Protos/catalog/catalog_pb'
import { Post } from '@Protos/cms/cms_pb'
import { Store } from '@Protos/stores/stores_pb'

export interface AvailableLocale {
  localeCode: string
  title: string
  url: string
}

export interface PageObject {
  id: string
  type: string
}

export interface CMSURLs {
  aboutUs: string
  cookiePolicy: string
  privacyPolicy: string
  terms: string
}

export interface CMSData {
  latestArticles: Post.AsObject[]
  latestCollections: Post.AsObject[]
  urls: CMSURLs
}

export interface CategoryNested extends Category.AsObject {
  children?: Category.AsObject[]
}

export interface InfoURLs {
  delivery: string
  paymentAndSecurity: string
  returns: string
}

export interface InfoData {
  urls: InfoURLs
}

export type PaymentIcons = string[]

interface Metadata {
  addSurrogateKey: (key: string) => void
  availableLocales: AvailableLocale[]
  categories: Category.AsObject[]
  categoriesMenu: CategoryNested[]
  cmsData: CMSData
  infoData: InfoData
  page?: PageObject
  paymentIcons: PaymentIcons
  store: Store.AsObject
}

interface MetadataProviderProps {
  addSurrogateKey: (key: string) => void
  availableLocales: AvailableLocale[]
  categories: Category.AsObject[]
  children: ReactNode
  cmsData: CMSData
  infoData: InfoData
  page?: PageObject
  paymentIcons: PaymentIcons
  store: Store.AsObject
}

const nestCategories = (categories: Category.AsObject[]): CategoryNested[] => {
  const parents = groupBy(categories, 'parentName')

  const findChildren = (parentName: string) => {
    const items = parents[parentName] || []
    if (isEmpty(items)) {
      return []
    }

    return sortBy(map(
      items,
      (category) => {
        const out = cloneDeep<CategoryNested>(category)

        const children = findChildren(category.name)
        if (!isEmpty(children)) {
          out.children = children
        }

        return out
      },
    ), 'title')
  }

  return findChildren('')
}

export const MetadataContext = createContext<Metadata>(null)
export const MetadataConsumer = MetadataContext.Consumer
export const MetadataProvider: FC<MetadataProviderProps> = (
  {
    addSurrogateKey,
    availableLocales,
    categories,
    children,
    cmsData,
    infoData,
    page,
    paymentIcons,
    store,
  }: MetadataProviderProps,
) => {
  const categoriesMenu = useMemo(
    () => nestCategories(filter(categories, 'includeInMenu')),
    [categories],
  )

  return (
    <MetadataContext.Provider
      value={{
        addSurrogateKey,
        availableLocales,
        categories,
        categoriesMenu,
        cmsData,
        infoData,
        page,
        paymentIcons,
        store,
      }}
    >
      {children}
    </MetadataContext.Provider>
  )
}
