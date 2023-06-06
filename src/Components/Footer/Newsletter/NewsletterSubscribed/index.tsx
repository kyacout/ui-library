import React from 'react'
import { useTranslation } from 'react-i18next'

import CheckIcon from '@Assets/SVG/Check'
import StarBgIcon from '@Assets/SVG/StarBg'
import { SVGIcon } from '@Components/Icons'

import css from './index.styl'

export const NewsletterSubscribed = () => {
  const { t } = useTranslation()

  return (
    <div className={css.SignupSuccess}>
      <div className={css.IconWrap}>
        <div className={`${css.Icon} ${css.IconBG}`}>
          <SVGIcon icon={StarBgIcon} size="70px" />
        </div>
        <div className={`${css.Icon} ${css.IconMain}`}>
          <SVGIcon icon={CheckIcon} size="35px" />
        </div>
      </div>

      <div className={css.TextWrap}>
        <p className={css.Title}>{t('footer:FOOTER_SIGN_UP_SUCCESS_TITLE')}</p>
        <p>{t('footer:FOOTER_SIGN_UP_SUCCESS_WELCOME')}</p>
        <p>{t('footer:FOOTER_SIGN_UP_SUCCESS_FIRST_MAIL')}</p>
      </div>
    </div>
  )
}
