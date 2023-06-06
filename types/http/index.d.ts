import { i18n } from 'i18next'

import {
  AvailableLocale,
  CMSData,
  InfoData,
  PaymentIcons,
} from '@Globals/Metadata'
import { SplitTests } from '@Globals/SplitTests'
import { Category } from '@Protos/catalog/catalog_pb'
import { Store } from '@Protos/stores/stores_pb'

declare module 'http' {
  export interface IncomingMessage {
    i18n?: i18n
    thAvailableLocales: AvailableLocale[]
    thCMSData: CMSData
    thCategories?: Category[]
    thInfoData: InfoData
    thPaymentIcons: PaymentIcons
    thSplitTests: SplitTests
    thStore: Store
  }

  export interface ServerResponse {
    thAddSurrogateKey: (key: string) => void
    thAddVary: (header: string) => void
  }
}
