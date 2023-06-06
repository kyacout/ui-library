import clsx from 'clsx'
import map from 'lodash/map'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { MetadataContext } from '@Globals/Metadata'

import css from './index.styl'

export const LanguageToggle = () => {
  const { t } = useTranslation()
  const { availableLocales, store } = useContext(MetadataContext)

  if (!availableLocales || availableLocales.length < 2) {
    return null
  }

  return (
    <div className={css.LanguageToggle}>
      <div className={css.ButtonsWrap}>
        {map(availableLocales, ({ localeCode, title, url }) => (
          <a
            key={title}
            className={clsx(
              store?.config?.localeCode === localeCode && css.IsActive,
            )}
            href={url}
          >
            {title}
          </a>
        ))}
      </div>
      <span className={css.ToggleText}>{t('header:SIDE_BAR_LANG_SELECT_TITLE')}</span>
    </div>
  )
}
