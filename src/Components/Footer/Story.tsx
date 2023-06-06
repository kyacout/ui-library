import React, { useContext } from 'react'

import FacebookIcon from '@Assets/SVG/SocialMedia/Facebook'
import InstagramIcon from '@Assets/SVG/SocialMedia/Instagram'
import YoutubeIcon from '@Assets/SVG/SocialMedia/Youtube'
import { SVGIcon } from '@Components/Icons'
import { MetadataContext } from '@Globals/Metadata'
import { useTranslation } from '@Globals/Translations'

import css from './index.styl'

export const Story = () => {
  const { t, tDanger } = useTranslation()
  const { cmsData } = useContext(MetadataContext)

  return (
    <div className={`${css.Element} ${css.Story}`}>
      <div className={css.SectionTitle}>{t('footer:GET_TO_KNOW_US')}</div>
      <p
        className={css.Text}
        {...tDanger('footer:uiLibrary_STORY_INTRO_TEXT', { arg1: cmsData?.urls?.aboutUs })}
      />
      <div className={css.SectionTitle} style={{ marginTop: '20px' }}>{t('footer:FIND_US')}</div>
      <div className={css.ContactContainer}>
        <a
          className={css.Row}
          href="https://www.facebook.com/uiLibrary"
          rel="noopener noreferrer"
          target="_blank"
        >
          <SVGIcon icon={FacebookIcon} />
          <div className={css.ItemText}>{t('footer:FACEBOOK_LABEL')}</div>
        </a>
        <a
          className={css.Row}
          href="https://www.youtube.com/uiLibrary"
          rel="noopener noreferrer"
          target="_blank"
        >
          <SVGIcon icon={YoutubeIcon} />
          <div className={css.ItemText}>{t('footer:YOUTUBE_LABEL')}</div>
        </a>
        <a
          className={css.Row}
          href="https://www.instagram.com/uiLibrary"
          rel="noopener noreferrer"
          target="_blank"
        >
          <SVGIcon icon={InstagramIcon} />
          <div className={css.ItemText}>{t('footer:INSTAGRAM_LABEL')}</div>
        </a>
      </div>
    </div>
  )
}
