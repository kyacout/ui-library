import clsx from 'clsx'
import includes from 'lodash/includes'
import React, { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { MetadataContext } from '@Globals/Metadata'

import css from './index.styl'

interface CoronaBarProps {
  hide: boolean
}

export const CoronaBar: FC<CoronaBarProps> = ({ hide = false }: CoronaBarProps) => {
  const { t } = useTranslation()
  const { store } = useContext(MetadataContext)
  const activeStores = ['AU', 'NZ', 'ES', 'PT', 'US', 'ZA']
  const today = new Date()

  if (!includes(activeStores, store?.config?.countryCode)) {
    return null
  }

  return (
    <div className={clsx(
      css.root,
      hide && css.hide,
    )}
    >
      <span className={css.text}>
        {today.toLocaleDateString(store?.config?.localeCode)}
        {' '}
        -
        {' '}
        {t('header:CORONA_EXPECTED_DELIVERY_DELAY')}
      </span>
    </div>
  )
}
