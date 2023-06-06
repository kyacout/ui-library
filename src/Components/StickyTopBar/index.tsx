import includes from 'lodash/includes'
import noop from 'lodash/noop'
import React, {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react'

import { Link } from '@Components/Link'
import { NavigationEvent } from '@Events/Navigation'
import { imageURL } from '@Globals/Cloudinary'
import { MetadataContext } from '@Globals/Metadata'
import { Name } from '@Globals/Resource'
import { storageAvailable } from '@Globals/Storage'
import { useMediaQuery } from '@Globals/useMediaQuery'

import css from './index.styl'

const LS_STICKY_TOP_BAR_DATA = 'stickyTopBarData'

interface StickyTopBarState {
  all_stores?: '0' | '1'
  desktopImage?: string
  destPageType?: string
  link?: string
  mobileImage?: string
  post_id?: string
  stores?: string
  text?: string
  timestamp?: number
}

interface StickyTopBarProps {
  onVisibilityChange?: (visible: boolean) => void
}

export const StickyTopBar: FC<StickyTopBarProps> = (
  {
    onVisibilityChange = noop,
  }: StickyTopBarProps,
) => {
  const [stickyTopBar, setStickyTopBar] = useState<StickyTopBarState>(null)
  const { store } = useContext(MetadataContext)
  const storeId = new Name(store?.name).id
  const isDesktop = useMediaQuery('(min-width:480px)')

  useEffect(() => {
    if (!storageAvailable('localStorage')) {
      return
    }

    const dataString = window.localStorage.getItem(LS_STICKY_TOP_BAR_DATA)
    const json: StickyTopBarState = dataString && JSON.parse(dataString)
    if (!json) {
      return
    }

    if (json.timestamp) {
      // Check timestamp
      const now = new Date().getTime()
      const difference = now - stickyTopBar.timestamp
      const threshold = 1000 * 60 * 60 * 24 * 14

      if (difference > threshold) {
        window.localStorage.removeItem(LS_STICKY_TOP_BAR_DATA)
        return
      }
    }

    if (json.all_stores === '1') {
      setStickyTopBar(json)
      return
    }

    if (json.stores && storeId && includes(json.stores, storeId)) {
      setStickyTopBar(json)
      return
    }
  }, [storeId])

  useEffect(() => {
    onVisibilityChange(!!stickyTopBar)
  }, [!!stickyTopBar])

  if (!stickyTopBar) {
    return null
  }

  const bgImage = isDesktop ? stickyTopBar.desktopImage : stickyTopBar.mobileImage
  return (
    <Link
      className={css.StickyTopBar}
      event={new NavigationEvent({
        attributes: {
          dest_page_type: stickyTopBar.destPageType || '',
          dest_page_type_id: stickyTopBar.post_id || '',
          source_id: 'sticky_top_bar',
        },
        eventName: 'nav_link_click',
      })}
      href={stickyTopBar.link}
      style={{ backgroundImage: `url("${imageURL(bgImage)}")` }}
    >
      <div className={css.Inner}>
        <p>{stickyTopBar.text}</p>
      </div>
    </Link>
  )
}
