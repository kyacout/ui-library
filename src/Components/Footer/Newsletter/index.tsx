import React, { useContext, useState } from 'react'

import { MetadataContext } from '@Globals/Metadata'
import { useTranslation } from '@Globals/Translations'

import css from '../index.styl'
import { NewsletterSubscribed } from './NewsletterSubscribed'
import { NewsletterSubscriptionForm } from './NewsletterSubscriptionForm'

export const Newsletter = () => {
  const { t, tDanger } = useTranslation()
  const { cmsData } = useContext(MetadataContext)
  const [newsletterFormSubmitted, setFormSubmitted] = useState(false)

  return (
    <div className={`${css.Element} ${css.Newsletter}`}>
      <div className={css.SectionTitle}>{t('footer:BE_INSPIRED_AND_GET_DEALS')}</div>
      <ul>
        <li className={css.NewsletterItem}>
          {'- '}
          {t('footer:OFFERS_AND_NEWS_ABOUT_OUR_PRODUCTS')}
        </li>
        <li className={css.NewsletterItem}>
          {'- '}
          {t('footer:OCCASIONAL_DISCOUNTS_OF_UP_TO_50')}
        </li>
        <li className={css.NewsletterItem}>
          {'- '}
          {t('footer:SPECIAL_DEALS_FOR_EMAIL_SUBSCRIBERS')}
        </li>
        <li className={css.NewsletterItem}>
          {'- '}
          <span
            {...tDanger(
              'footer:I_AM_AWARE_OF_uiLibrary_PRIVACY_POLICY',
              {
                arg1: cmsData?.urls?.privacyPolicy,
              },
            )}
          />
        </li>
      </ul>
      {newsletterFormSubmitted ? (
        <NewsletterSubscribed />
      ) : (
        <NewsletterSubscriptionForm formSubmissionSuccessful={() => setFormSubmitted(true)} />
      )}
    </div>
  )
}
