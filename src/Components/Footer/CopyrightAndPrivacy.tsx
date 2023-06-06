import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { MetadataContext } from '@Globals/Metadata'
import { storeURL } from '@Globals/Store'

import css from './index.styl'

export const CopyrightAndPrivacy = () => {
  const { t } = useTranslation()
  const { cmsData, store } = useContext(MetadataContext)

  return (
    <>
      <div className={css.Copyright}>
        <a href={cmsData?.urls?.privacyPolicy}>{t('footer:PRIVACY_POLICY')}</a>
        {' | '}
        <a href={cmsData?.urls?.cookiePolicy}>{t('footer:COOKIES_POLICY')}</a>
      </div>
      <div className={css.Copyright}>
        © 2009-2020
        {' | '}
        {store?.config?.urlDomain}
        {' | '}
        {` Tel: ${store?.config?.phone} - ${store?.config?.email}`}
        {' | '}
        <a href={cmsData?.urls?.terms}>{t('footer:TERMS_AND_CONDITIONS')}</a>
        {' | '}
        <a href={storeURL('csr')}>{t('footer:CSR_TITLE')}</a>
        {' | '}
        <a href={storeURL('press')}>{t('footer:PRESS_TITLE')}</a>
      </div>
    </>
  )
}
