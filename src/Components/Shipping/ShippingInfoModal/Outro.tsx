import React from 'react'

import { useTranslation } from '@Globals/Translations'

import css from './Outro.styl'

export const ShippingOutro = () => {
  const { t } = useTranslation()

  return (
    <div className={css.root}>
      {t('header:DELIVERY_INFO_OUTRO_TEXT')}
    </div>
  )
}
