import noop from 'lodash/noop'
import React, {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

import CloseIcon from '@Assets/SVG/Close'
import { CloudinaryImage } from '@Components/CloudinaryImage'
import { SVGIcon } from '@Components/Icons'
import { MetadataContext } from '@Globals/Metadata'
import { Name } from '@Globals/Resource'
import { storageAvailable } from '@Globals/Storage'
import { UserContext } from '@Globals/User'

import css from './index.styl'

const LS_YOLO_EU_TOP_BAR_CLOSED = 'yolo-eu-top-bar-closed'

interface YOLOBarProps {
  onVisibilityChange?: (visible: boolean) => void
}

export const YOLOBar: FC<YOLOBarProps> = (
  {
    onVisibilityChange = noop,
  }: YOLOBarProps,
) => {
  const { t } = useTranslation()
  const { userData } = useContext(UserContext)
  const { store } = useContext(MetadataContext)
  const storeId = new Name(store?.name).id

  const [showYOLOBar, setShowYOLOBar] = useState(false)

  useEffect(() => {
    if (storageAvailable('sessionStorage')
      && window.sessionStorage.getItem(LS_YOLO_EU_TOP_BAR_CLOSED)
    ) {
      return
    }

    if (!userData?.otherCountry?.isEU) {
      return
    }

    setShowYOLOBar(true)
  }, [userData])

  const onCloseButtonClick = () => {
    if (storageAvailable('sessionStorage')) {
      window.sessionStorage.setItem(LS_YOLO_EU_TOP_BAR_CLOSED, '1')
    }

    setShowYOLOBar(false)
  }

  useEffect(() => {
    onVisibilityChange(showYOLOBar)
  }, [showYOLOBar])

  if (!showYOLOBar) {
    return null
  }

  const country = userData?.otherCountry?.countryNameMap[storeId]
  return (
    <section className={css.YoloEuTopBar}>
      <div className={css.Inner}>
        <div className={css.MessageWrap}>
          <CloudinaryImage
            alt="uiLibrary EU shipping"
            path="frontend/random-images/eu-truck.svg"
          />
          <span>
            {t('header:YOLO_TOP_BAR_EU_SHIPPING_TEXT', { arg1: country })}
            <span className={css.ShippingOptions}>
              {t('header:SEE_SHIPPING_OPTIONS')}
            </span>
          </span>
        </div>
        <div className={css.CloseIcon} onClick={onCloseButtonClick} role="button" tabIndex={0}>
          <SVGIcon icon={CloseIcon} size="14px" />
        </div>
      </div>
    </section>
  )
}
