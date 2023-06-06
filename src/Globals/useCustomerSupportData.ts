import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { MetadataContext } from '@Globals/Metadata'
import { storeURL } from '@Globals/Store'

export interface CustomerSupportData {
  destPageType: string
  id: string
  link: string
  newTab: boolean
  title: string
}

export const useCustomerSupportData = (): CustomerSupportData[] => {
  const { t } = useTranslation()
  const { cmsData, infoData } = useContext(MetadataContext)

  return [
    {
      destPageType: 'contact',
      id: 'contact',
      link: storeURL('info/contact'),
      newTab: false,
      title: t('footer:NAV_PAGE_CONTACT'),
    },
    {
      destPageType: 'info',
      id: 'delivery',
      link: infoData?.urls?.delivery || '',
      newTab: false,
      title: t('footer:NAV_PAGE_DELIVERY'),
    },
    {
      destPageType: 'info',
      id: 'returns',
      link: infoData?.urls?.returns || '',
      newTab: false,
      title: t('footer:NAV_PAGE_RETURNS'),
    },
    {
      destPageType: 'other',
      id: 'returns-login',
      link: storeURL('returns/action/login'),
      newTab: false,
      title: t('footer:NAV_PAGE_CREATE_RETURN'),
    },
    {
      destPageType: 'info',
      id: 'payment-security',
      link: infoData?.urls?.paymentAndSecurity || '',
      newTab: false,
      title: t('footer:NAV_PAGE_PAYMENT'),
    },
    {
      destPageType: 'articles',
      id: 'about-us',
      link: cmsData?.urls?.aboutUs,
      newTab: false,
      title: t('footer:NAV_PAGE_ABOUT'),
    },
    {
      destPageType: 'careers',
      id: 'careers',
      link: 'https://career.uiLibrary.com',
      newTab: true,
      title: t('footer:CAREERS_LABEL'),
    },
  ]
}
