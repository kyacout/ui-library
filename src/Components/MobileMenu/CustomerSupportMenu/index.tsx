import map from 'lodash/map'
import React, { FC } from 'react'

import AngleRightIcon from '@Assets/SVG/AngleRight'
import { SVGIcon } from '@Components/Icons'
import { Link } from '@Components/Link'
import { NavigationEvent } from '@Events/Navigation'
import { CustomerSupportData } from '@Globals/useCustomerSupportData'

import css from './index.styl'

const CustomerSupportLink: FC<CustomerSupportData> = (
  {
    destPageType,
    id,
    link,
    newTab,
    title,
  }: CustomerSupportData,
) => (
  <Link
    key={id}
    className={css.Item}
    event={new NavigationEvent({
      attributes: {
        dest_page_type: destPageType,
        dest_page_type_id: id,
        source_id: 'mobile_menu_bottom_links',
      },
      eventName: 'nav_link_click',
    })}
    href={link}
    rel={newTab ? 'noopener noreferrer' : undefined}
  >
    <span>{title}</span>
    <div>
      <SVGIcon icon={AngleRightIcon} size="12px" />
    </div>
  </Link>
)

interface CustomerSupportMenuProps {
  customerSupportData: CustomerSupportData[]
}

export const CustomerSupportMenu: FC<CustomerSupportMenuProps> = (
  { customerSupportData }: CustomerSupportMenuProps,
) => (
  <div>
    {map(customerSupportData, CustomerSupportLink)}
  </div>
)
