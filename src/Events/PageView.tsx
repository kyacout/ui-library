import {
  BaseAttributes,
  PageViewAttributes,
  PageViewConstructor,
} from '@uiLibrary/data-plans/lib/uiLibrary_ecom'
import get from 'lodash/get'
import pick from 'lodash/pick'
import reduce from 'lodash/reduce'
import split from 'lodash/split'
import { FC, useEffect } from 'react'

import {
  Event,
  EventFormat,
  EventType,
} from '@Events/Base'
import { handleEvent } from '@Events/Manager'
import { isFirstVisitOver } from '@Globals/Device'
import {
  identify,
  setUserAttributeList,
  setUserAttributes,
} from '@Globals/MParticle/User'

type PageViewProps = {
  debug?: boolean
  eventProps: PageViewConstructor
}

interface ReferrerAttributes {
  referrer: string
  referring_domain: string
}

interface URLAttributes {
  gclid: string
  utm_campaign: string
  utm_content: string
  utm_medium: string
  utm_source: string
  utm_term: string
}

export class PageViewEvent<T extends PageViewConstructor> extends Event {
  static hasNormalHeader: boolean = false

  static hasSideBar: boolean = false

  attributes: T['attributes']

  isLandingPage: boolean

  pageName: T['pageName']

  constructor({ attributes, pageName }: T) {
    super()
    this.attributes = attributes
    this.isLandingPage = isFirstVisitOver()
    this.pageName = pageName
  }

  static setHasNormalHeader(input: boolean) {
    PageViewEvent.hasNormalHeader = input
  }

  static setHasSideBar(input: boolean) {
    PageViewEvent.hasSideBar = input
  }

  getAttributes(): BaseAttributes & PageViewAttributes & T['attributes'] {
    return {
      ...super.getAttributes(),
      ...this.getPageViewAttributes(),
      ...this.attributes,
    }
  }

  getAttributesSafe(): BaseAttributes & PageViewAttributes & T['attributes'] {
    return super.getAttributesSafe() as BaseAttributes & PageViewAttributes & T['attributes']
  }

  getName(): T['pageName'] {
    return this.pageName
  }

  // This has its own function to ensure validation of pageview attributes happen correctly.
  // If these are added directly in getAttributes, "this.attributes" acts as a catch-all for certain
  // properties, resulting in no, or invalid validation of PageView properties.
  getPageViewAttributes(): PageViewAttributes {
    return {
      ...this.getReferrerAttributes(),
      ...this.getURLAttributes(),
      has_normal_header: PageViewEvent.hasNormalHeader,
      has_side_bar: PageViewEvent.hasSideBar,
      is_landing_page: this.isLandingPage,
    }
  }

  getReferrerAttributes(): ReferrerAttributes {
    if (this.isLandingPage && document.referrer) {
      return {
        referrer: document.referrer,
        referring_domain: new URL(document.referrer).hostname,
      }
    }

    return {
      referrer: '',
      referring_domain: '',
    }
  }

  getType(): EventType {
    return 'PageView'
  }

  getURLAttributes(): URLAttributes {
    const urlParams = new URLSearchParams(window.location.search)

    return reduce(
      [
        'gclid',
        'utm_campaign',
        'utm_content',
        'utm_medium',
        'utm_source',
        'utm_term',
      ],
      (memo, item) => ({
        ...memo,
        [item]: urlParams.get(item) || '',
      }),
      {} as URLAttributes,
    )
  }

  transform(): EventFormat {
    return [
      'mParticle.logPageView',
      [
        this.getName(),
        this.getAttributesSafe(),
      ],
      `pageview-${this.pageName}`,
    ]
  }
}

export const PageView: FC<PageViewProps> = (
  {
    debug = false,
    eventProps,
  }: PageViewProps,
) => {
  useEffect(() => {
    const runEffect = async () => {
      const url = new URL(window.location.href)
      if (url.searchParams.has('thcid')) {
        await identify({ customerID: url.searchParams.get('thcid') })
      }

      const event = new PageViewEvent(eventProps)

      const eventAttributes = event.getAttributesSafe()

      const splitTests: string | false = get(eventAttributes, 'split_tests', false)

      const userAttributes = pick(
        eventAttributes,
        [
          'gclid',
          'referrer',
          'referring_domain',
          'utm_campaign',
          'utm_content',
          'utm_medium',
          'utm_source',
          'utm_term',
        ],
      )

      if (debug) {
        console.log(
          '[pageview] debug enabled (not sending event)',
          {
            eventAttributes,
            splitTests,
            userAttributes,
          },
        )
        return
      }

      try {
        await setUserAttributes(userAttributes)

        if (splitTests) {
          await setUserAttributeList('uiLibrary_ecom_split_tests', split(splitTests, ','))
        }
      } catch (err) {
        console.error('failed to set user attributes', err)
      }

      handleEvent(event)
    }

    runEffect()
  }, [])

  return null
}
