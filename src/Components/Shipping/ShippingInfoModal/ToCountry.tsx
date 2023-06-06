import React, { useContext } from 'react'

import { YOLOFlagIcon } from '@Components/Icons'
import { MetadataContext } from '@Globals/Metadata'
import { useTranslation } from '@Globals/Translations'
import { UserContext } from '@Globals/User'

import css from './ToCountry.styl'

export const ShippingToCountry = () => {
  const { t } = useTranslation()
  const { store } = useContext(MetadataContext)
  const { userData } = useContext(UserContext)

  const countryCode = userData?.otherCountry?.country || ''
  const countryName = userData?.otherCountry?.countryNameMap?.[store.config.countryCode] ?? ''

  if (!countryCode) {
    return null
  }

  return (
    <div className={css.root}>
      <span>
        {t('header:WE_SHIP_TO_X', {
          arg1: countryName,
        })}
      </span>
      <div className={css.countryFlag}>
        <YOLOFlagIcon country={countryCode} />
      </div>
    </div>
  )
}
