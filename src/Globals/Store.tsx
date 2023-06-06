import getConfig from 'next/config'
import { useContext } from 'react'

import { MetadataContext } from '@Globals/Metadata'
import { Name } from '@Globals/Resource'

type RedirectType = 'category' | 'cms' | 'product'

const { publicRuntimeConfig } = getConfig()

export const redirectURL = (
  type: RedirectType,
  id: string,
  useStore: boolean = false,
) => {
  const { store } = useContext(MetadataContext)

  const url = new URL(`${publicRuntimeConfig.redirectEndpoint}/redirect/type/${type}/id/${id}`)

  if (useStore) {
    url.searchParams.set('store', new Name(store?.name).id)
  }

  return url.toString()
}

export const storeURL = (path: string, params?: URLSearchParams) => {
  const { store } = useContext(MetadataContext)

  const url = new URL(path, store?.config?.urlFull)

  if (params) {
    params.forEach((value, key) => {
      url.searchParams.set(key, value)
    })
  }

  return url.toString()
}
