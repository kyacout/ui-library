import React, {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react'

import CloseIcon from '@Assets/SVG/Close'
import { CloudinaryImage } from '@Components/CloudinaryImage'
import { SVGIcon } from '@Components/Icons'
import { MetadataContext } from '@Globals/Metadata'
import { storageAvailable } from '@Globals/Storage'
import { useTranslation } from '@Globals/Translations'

import css from './index.styl'

const LS_COOKIE_BAR_CLOSED = 'cookie-bar-closed'

export const CookieBar: FC = () => {
  const { t, tDanger } = useTranslation()
  const { cmsData } = useContext(MetadataContext)
  const [showCookieBar, setShowCookieBar] = useState(false)

  useEffect(() => {
    if (!storageAvailable('localStorage')) {
      return
    }

    if (window.localStorage.getItem(LS_COOKIE_BAR_CLOSED)) {
      return
    }
    setShowCookieBar(true)
  }, [])

  const onCloseButtonHandler = () => {
    localStorage.setItem(LS_COOKIE_BAR_CLOSED, '1')
    setShowCookieBar(false)
  }

  if (!showCookieBar || !cmsData?.urls?.cookiePolicy) {
    return null
  }

  return (
    <section className={css.CookieBar}>
      <div className={css.CookieBarInner}>
        <div className={css.MessageWrap}>
          <CloudinaryImage path="frontend/random-images/cookie-icon.svg" />
          <div className={css.TextWrap}>
            <span
              className={css.CookieText}
              {...tDanger('header:COOKIE_TEXT', { arg1: cmsData?.urls?.cookiePolicy })}
            />
            <span className={css.AcceptText} onClick={onCloseButtonHandler}>
              {t('header:I_ACCEPT')}
            </span>
          </div>
        </div>
        <div className={css.CloseIcon} onClick={onCloseButtonHandler}>
          <SVGIcon icon={CloseIcon} size="14px" />
        </div>
      </div>
    </section>
  )
}
