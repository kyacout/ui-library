import React, { useContext, useState } from 'react'

import { CloudinaryImage } from '@Components/CloudinaryImage'
import { MetadataContext } from '@Globals/Metadata'
import { useTranslation } from '@Globals/Translations'

import css from './index.styl'
import { NewsletterSubscribed } from './NewsletterSubscribed'
import { NewsletterSubscriptionForm } from './NewsletterSubscriptionForm'

export const Newsletter = () => {
  const { t, tDanger } = useTranslation()
  const { cmsData } = useContext(MetadataContext)

  const [formSubmitted, setFormSubmitted] = useState(false)

  return (
    <div className={css.NewsletterContainer}>
      <span className={css.Title}>{t('sidebar:SIDE_BAR_SIGN_UP_TITLE')}</span>
      <div className={css.ContentContainer}>
        <CloudinaryImage
          options={{ width: 210 }}
          path="frontend/random-images/newsletter-box.jpg"
        />
        <div className={css.InnerContainer}>
          <p>{t('sidebar:NEWSLETTER_INTRO_TEXT')}</p>
          <p
            {...tDanger(
              'sidebar:I_AM_AWARE_OF_uiLibrary_PRIVACY_POLICY',
              {
                arg1: cmsData?.urls?.privacyPolicy,
              },
            )}
          />
        </div>
        {formSubmitted
          ? <NewsletterSubscribed />
          : <NewsletterSubscriptionForm formSubmissionSuccessful={() => setFormSubmitted(true)} />}
      </div>
    </div>
  )
}
