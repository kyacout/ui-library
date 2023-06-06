import React from 'react'
import { useTranslation } from 'react-i18next'

import ThumbsUpIcon from '@Assets/SVG/ThumbsUp'
import { SVGIcon } from '@Components/Icons'

import css from './index.styl'

export const NewsletterSubscribed = () => {
  const { t } = useTranslation()

  return (
    <div className={css.SignupSuccess}>
      <div className={css.ThumbsContainer}>
        <SVGIcon icon={ThumbsUpIcon} size="30px" />
      </div>
      <p>{t('sidebar:FOOTER_SIGN_UP_SUCCESS_WELCOME')}</p>
      <p>{t('sidebar:FOOTER_SIGN_UP_SUCCESS_FIRST_MAIL')}</p>
    </div>
  )
}
