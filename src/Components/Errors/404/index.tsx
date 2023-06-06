import React from 'react'

import { CloudinaryImage } from '@Components/CloudinaryImage'
import { SearchAdornment } from '@Components/FormElements/Adornments/Search'
import { TextField } from '@Components/FormElements/UI/TextField'
import { storeURL } from '@Globals/Store'
import { useTranslation } from '@Globals/Translations'

import css from './index.styl'

export const Error404 = () => {
  const catalogSearchResultURL = storeURL('catalogsearch/result/')
  const { t } = useTranslation()

  return (
    <section className={css.root}>
      <p className={css.title}>{t('common:404_PAGE_OOPS')}</p>

      <p className={css.subTitle}>{t('common:404_PAGE_PAGE_NOT_FOUND')}</p>
      <p className={css.reason}>{t('common:404_PAGE_BROKE_THE_INTERNET')}</p>

      <div className={css.form}>
        <p>{t('common:404_PAGE_SHERLOCK_ON_CASE')}</p>

        <form action={catalogSearchResultURL} method="get">
          <TextField
            adornments={{
              end: <SearchAdornment />,
            }}
            label={t('common:404_PAGE_SEARCH_FIELD_TEXT')}
            name="q"
            type="text"
            withoutLabelAnimation
          />
        </form>
      </div>

      <p>{t('common:404_PAGE_DO_LIKE_MIKKEL')}</p>
      <CloudinaryImage
        options={{ width: 460 }}
        path="frontend/404-image.gif"
      />
    </section>
  )
}
