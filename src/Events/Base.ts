import { BaseAttributes } from '@uiLibrary/data-plans/lib/uiLibrary_ecom'
import includes from 'lodash/includes'
import join from 'lodash/join'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import snakeCase from 'lodash/snakeCase'
import trim from 'lodash/trim'

import { getDeviceType } from '@Globals/Device'
import { Name } from '@Globals/Resource'
import { SplitTests } from '@Globals/SplitTests'
import { getSplitTestsHistory, upsertSplitTestsHistory } from '@Globals/SplitTests/History'
import { Store, StoreConfig } from '@Protos/stores/stores_pb'

export type EventAttributes = Record<string, any>
export type EventFormat = [string, any[], string?]
export type EventName = string
export interface EventPage {
  id?: string
  type?: EventPageType
}

export type EventPageType =
  'articles'
  | 'brand'
  | 'cart'
  | 'category'
  | 'category-landing-page'
  | 'cms-category-articles'
  | 'cms-category-collections'
  | 'cof'
  | 'collections'
  | 'contact'
  | 'customer-area'
  | 'frontpages'
  | 'info'
  | 'order-tracking-history'
  | 'other'
  | 'product'
  | 'purchase'
  | 'return-flow'
  | 'searchresults'
  | 'wish-list'

export type EventType = string

// Any attribute not listed here, will be converted to snakecase if string
const safeAttributes = [
  // base attributes
  'country',
  'device_browser_width',
  'device_type',
  'source_name',
  'source_type',
  'split_tests',
  'src_page_type',
  'src_page_type_id',
  'store_id',

  // other known attributes
  'category_ids',
  'dest_page_type_id',
  'gclid',
  'personalisation_types',
  'referrer',
  'referring_domain',
  'search_query',
  'utm_campaign',
  'utm_content',
  'utm_medium',
  'utm_source',
  'utm_term',

  // perf attributes
  'perf_web_vitals_fcp',
  'perf_web_vitals_fid',
  'perf_web_vitals_lcp',
  'perf_web_vitals_ttfb',
]

export abstract class Event {
  static baseAttributes: EventAttributes

  static page: EventPage = {}

  static splitTests: SplitTests = {}

  static store: Store.AsObject

  static setAttributes(attributes: EventAttributes): void {
    Event.baseAttributes = {
      ...Event.baseAttributes,
      ...attributes,
    }
  }

  static setPage(type: EventPageType, id?: string): void {
    Event.page = { id, type }
  }

  static setSplitTests(splitTests: SplitTests): void {
    Event.splitTests = splitTests
    upsertSplitTestsHistory(splitTests)
  }

  static setStore(store: Store.AsObject): void {
    Event.store = store
  }

  // When adding new attributes here, remember to add them to safeAttributes
  getAttributes(): BaseAttributes {
    const config = Event.store.config || new StoreConfig().toObject()
    const deviceType = getDeviceType()
    const pageType = snakeCase(Event.page.type || 'other')
    const splitTests = join(
      map(
        getSplitTestsHistory(),
        (value, key) => `${key}_${value.group}`,
      ),
      ',',
    )
    const storeID = new Name(Event.store.name).id

    return {
      country: config.countryCode,
      device_browser_width: window.innerWidth,
      device_type: deviceType,
      source_name: 'uiLibrary',
      source_type: 'ecom',
      split_tests: splitTests,
      src_page_type: pageType,
      src_page_type_id: Event.page.id || '',
      store_id: storeID,
    }
  }

  getAttributesSafe(): BaseAttributes {
    const attributes = this.getAttributes()

    return reduce(
      attributes,
      (memo, value, key) => {
        const snakeKey = snakeCase(key)

        if (includes(safeAttributes, snakeKey)) {
          return {
            ...memo,
            [snakeKey]: typeof value === 'string'
              ? trim(value)
              : value,
          }
        }

        return {
          ...memo,
          [snakeKey]: typeof value === 'string'
            ? snakeCase(trim(value))
            : value,
        }
      },
      {} as BaseAttributes,
    )
  }

  transform(): EventFormat {
    return [
      'mParticle.logEvent',
      [
        this.getName(),
        (window as any).mParticle.EventType[this.getType()],
        this.getAttributesSafe(),
      ],
    ]
  }

  abstract getName(): EventName

  abstract getType(): EventType
}
