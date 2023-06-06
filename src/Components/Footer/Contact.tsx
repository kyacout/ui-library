import clsx from 'clsx'
import React, { useContext } from 'react'
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

export const Contact = () => {
  const { t } = useTranslation()
  const { store } = useContext(MetadataContext)
  const phone = store?.config?.phone

  const contactURL = storeURL('info/contact')

  return (
    <div className={`${css.Element} ${css.Contact} ${css.Top}`}>
      <div className={css.SectionTitle}>{t('footer:FOOTER_CONTACT_TITLE')}</div>
      <div className={css.ContactContainer}>
        <div className={css.Row}>
          <SVGIcon icon={LetterIcon} />
          <Link
            className={clsx(css.ItemText, css.Link)}
            event={new NavigationEvent({
              attributes: {
                dest_page_type: 'contact',
                dest_page_type_id: '',
                source_id: 'footer_contact_us',
              },
              eventName: 'nav_link_click',
            })}
            href={contactURL}
          >
            {t('footer:FOOTER_CONTACT_EMAIL_US')}
          </Link>
        </div>
        <a className={css.Row} href={`tel:${phone}`}>
          <SVGIcon icon={PhoneIcon} />
          <span className={`${css.ItemText} ${css.Link}`}>{phone}</span>
        </a>
        <div className={css.Row}>
          <SVGIcon icon={ClockIcon} />
          <p className={css.ItemText}>{t('footer:FOOTER_CONTACT_PHONES_ARE_OPEN_BETWEEN')}</p>
        </div>
      </div>
    </div>
  )
}
