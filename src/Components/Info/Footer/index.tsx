import React, { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import ClockIcon from '@Assets/SVG/Clock'
import LetterIcon from '@Assets/SVG/Letter'
import PhoneIcon from '@Assets/SVG/Phone'
import { SVGIcon } from '@Components/Icons'
import { Link } from '@Components/Link'
import { NavigationEvent } from '@Events/Navigation'
import { MetadataContext } from '@Globals/Metadata'
import { storeURL } from '@Globals/Store'

import css from './index.styl'

export const Footer: FC = () => {
  const { t } = useTranslation()
  const contactURL = storeURL('info/contact')

  const { store } = useContext(MetadataContext)
  const phone = store?.config?.phone

  return (
    <div className={css.root}>
      <Link
        className={css.item}
        event={new NavigationEvent({
          attributes: {
            dest_page_type: 'contact',
            dest_page_type_id: '',
            source_id: 'link_suggestion',
          },
          eventName: 'nav_link_click',
        })}
        href={contactURL}
      >
        <div className={css.iconWrap}>
          <SVGIcon icon={LetterIcon} />
        </div>
        <span>{t('info:EMAIL_US_LABEL')}</span>
      </Link>
      <div className={css.item}>
        <div className={css.iconWrap}>
          <SVGIcon icon={ClockIcon} />
        </div>
        <span>{t('info:WE_ARE_AVAILABLE_BETWEEN_LABEL')}</span>
      </div>
      <Link
        className={css.item}
        href={`tel:${phone}`}
      >
        <div className={css.iconWrap}>
          <SVGIcon icon={PhoneIcon} />
        </div>
        <span>{phone}</span>
      </Link>
    </div>
  )
}
