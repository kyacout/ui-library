import map from 'lodash/map'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import css from '@Components/Footer/index.styl'
import { Link } from '@Components/Link'
import { NavigationEvent } from '@Events/Navigation'
import { CustomerSupportData, useCustomerSupportData } from '@Globals/useCustomerSupportData'

const CustomerSupportLink: FC<CustomerSupportData> = (
  {
    destPageType,
    id,
    link,
    newTab,
    title,
  }: CustomerSupportData,
) => (
  <li key={id} className={`${css.CustomerSupportItem} ${css.Link}`}>
    <Link
      event={new NavigationEvent({
        attributes: {
          dest_page_type: destPageType,
          dest_page_type_id: id,
          source_id: 'footer_customer_support',
        },
        eventName: 'nav_link_click',
      })}
      href={link}
      rel={newTab ? 'noopener noreferrer' : undefined}
      target={newTab ? '_blank' : undefined}
    >
      {title}
    </Link>
  </li>
)
export const CustomerSupport: FC = () => {
  const { t } = useTranslation()
  const customerSupportData = useCustomerSupportData()

  return (
    <div className={`${css.Element} ${css.CustomerSupport}`}>
      <div className={css.SectionTitle}>{t('footer:CUSTOMER_SUPPORT')}</div>
      <ul>
        {map(customerSupportData, CustomerSupportLink)}
      </ul>
    </div>
  )
}
