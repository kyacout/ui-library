import map from 'lodash/map'
import React from 'react'

import CartIcon from '@Assets/SVG/Cart'
import InfoIcon from '@Assets/SVG/Info'
import InfoBoxIcon from '@Assets/SVG/InfoBox'
import InfoPaymentIcon from '@Assets/SVG/InfoPayment'
import ReturnIcon from '@Assets/SVG/Return'
import TruckIcon from '@Assets/SVG/Truck'
import { SVGIcon } from '@Components/Icons'
import { Link } from '@Components/Link'
import { NavigationEvent } from '@Events/Navigation'
import { Name } from '@Globals/Resource'
import { Section } from '@Protos/info/info_pb'

import css from './index.styl'

interface SectionsProps {
  sections: Section.AsObject[]
}

const iconsMap = {
  about: InfoIcon,
  delivery: TruckIcon,
  order: CartIcon,
  paying: InfoPaymentIcon,
  return: ReturnIcon,
  stock: InfoBoxIcon,
}

export const LinkGrid = ({ sections }: SectionsProps) => (
  <div className={css.root}>
    {map(sections, section => (
      <Link
        key={section.name}
        event={new NavigationEvent({
          attributes: {
            dest_page_type: 'info_section',
            dest_page_type_id: new Name(section.name).id,
            source_id: 'link_suggestion',
          },
          eventName: 'nav_link_click',
        })}
        href={section.url}
      >
        <div className={css.iconWrap}>
          <SVGIcon icon={iconsMap[section.icon]} size="60px" />
        </div>
        <span>{section.displayName}</span>
      </Link>
    ))}
  </div>
)
