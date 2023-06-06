import React, { FC } from 'react'

import { TrustIcon } from '@Components/Icons'
import { Link } from '@Components/Link'
import { NavigationEvent } from '@Events/Navigation'
import { Store } from '@Protos/stores/stores_pb'

import css from './index.styl'

interface FooterProps {
  store: Store.AsObject
}

export const Footer: FC<FooterProps> = ({ store }: FooterProps) => {
  const urlFull = store?.config?.urlFull || '/'

  if (store.name === 'stores/5') {
    return (
      <div className={css.TrustedIcons}>
        <Link
          className={css.CollectionItemContainer}
          event={new NavigationEvent({
            attributes: {
              dest_page_type: 'external',
              dest_page_type_id: 'thuiswinkel',
              source_id: 'mobile_menu_footer',
            },
            eventName: 'nav_link_click',
          })}
          href="https://www.thuiswinkel.org/leden/uiLibrary-aps/certificaat"
          rel="noopener noreferrer"
          target="_blank"
        >
          <TrustIcon image="frontend/trust-logos/thuiswinkel-logo.png" />
        </Link>

        <div>
          <TrustIcon image="frontend/trust-logos/ecommerce-eu-logo.png" />
        </div>
      </div>
    )
  }

  if (store.name === 'stores/7') {
    return (
      <Link
        className={css.TrustedIcons}
        event={new NavigationEvent({
          attributes: {
            dest_page_type: 'external',
            dest_page_type_id: 'trustedshops',
            source_id: 'mobile_menu_footer',
          },
          eventName: 'nav_link_click',
        })}
        href="https://www.trustedshops.de/bewertung/info_X65F1BC0E9146075A175FFD0E17748A60.html"
        rel="noopener noreferrer"
        target="_blank"
      >
        <TrustIcon image="frontend/trust-logos/trusted-shops-logo.png" />
      </Link>
    )
  }

  if (store.name === 'stores/10') {
    return (
      <Link
        className={css.TrustedIcons}
        event={new NavigationEvent({
          attributes: {
            dest_page_type: 'external',
            dest_page_type_id: 'trustedshops',
            source_id: 'mobile_menu_footer',
          },
          eventName: 'nav_link_click',
        })}
        href="https://www.trustedshops.fr/evaluation/info_X486286508E1E6A83AF3E43C51929EA24.html"
        rel="noopener noreferrer"
        target="_blank"
      >
        <TrustIcon image="frontend/trust-logos/trusted-shops-logo.png" />
      </Link>
    )
  }

  if (store.name === 'stores/19' || store.name === 'stores/20') {
    return (
      <Link
        className={css.TrustedIcons}
        event={new NavigationEvent({
          attributes: {
            dest_page_type: 'external',
            dest_page_type_id: 'vsv-versandhandel',
            source_id: 'mobile_menu_footer',
          },
          eventName: 'nav_link_click',
        })}
        href="https://www.vsv-versandhandel.ch/fr/members/detail/uiLibrary-aps/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <TrustIcon image="frontend/trust-logos/swiss-online-guarantee-logo.png" />
      </Link>
    )
  }

  return (
    <div className={css.NormalFooter}>
      <Link
        event={new NavigationEvent({
          attributes: {
            dest_page_type: 'frontpages',
            dest_page_type_id: '',
            source_id: 'mobile_menu_footer',
          },
          eventName: 'nav_link_click',
        })}
        href={urlFull}
      >
        <img
          alt="uiLibrary"
          src="https://res.cloudinary.com/uiLibrary/image/upload/v1570536495/frontend/uiLibrary-logo-with-text.svg"
        />
      </Link>
    </div>
  )
}
