import map from 'lodash/map'
import React, { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { Link } from '@Components/Link'
import { NavigationEvent } from '@Events/Navigation'
import { MetadataContext } from '@Globals/Metadata'
import { storeURL } from '@Globals/Store'

import { CollectionItem } from './CollectionItem'
import css from './index.styl'

export const GetInspired: FC = () => {
  const { t } = useTranslation()
  const { cmsData } = useContext(MetadataContext)

  return (
    <div className={css.GetInspiredContainer}>
      <span className={css.Title}>{t('sidebar:HEADER_MOBILE_MENU_GET_INSPIRED')}</span>
      <div>
        {map(
          cmsData?.latestCollections || [],
          c => (
            <CollectionItem
              key={c.name}
              brandName={c.brandName}
              imageURL={c.imageUrl}
              link={c.url}
              name={c.name}
              title={c.title}
            />
          ),
        )}
      </div>
      <Link
        className={css.AllCollections}
        event={new NavigationEvent({
          attributes: {
            dest_page_type: 'cms-category-collections',
            dest_page_type_id: '',
            source_id: 'side_bar',
          },
          eventName: 'nav_link_click',
        })}
        href={storeURL('collections')}
      >
        {t('sidebar:SEE_ALL_COLLECTIONS')}
      </Link>
    </div>
  )
}
