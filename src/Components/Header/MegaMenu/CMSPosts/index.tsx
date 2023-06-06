import map from 'lodash/map'
import take from 'lodash/take'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { CloudinaryImage } from '@Components/CloudinaryImage'
import { Link } from '@Components/Link'
import { NavigationEvent } from '@Events/Navigation'
import { MetadataContext } from '@Globals/Metadata'
import { Name } from '@Globals/Resource'

import css from './index.styl'

export const CMSPosts = () => {
  const { t } = useTranslation()
  const { cmsData } = useContext(MetadataContext)

  return (
    <div className={css.CMSPosts}>
      <span className={css.SectionTitle}>{t('header:HEADER_MOBILE_MENU_GET_INSPIRED')}</span>

      {map(
        take(cmsData?.latestCollections || [], 2),
        collection => (
          <Link
            key={collection.name}
            className={css.CMSPostItem}
            event={new NavigationEvent({
              attributes: {
                dest_page_type: 'collections',
                dest_page_type_id: new Name(collection.name).id,
                source_id: 'mega_menu',
              },
              eventName: 'nav_link_click',
            })}
            href={collection.url}
          >
            <CloudinaryImage
              options={{ crop: 'thumb', height: 432, width: 720 }}
              path={collection.imageUrl}
            />
            <span className={css.PostTitle}>{collection.title}</span>
          </Link>
        ),
      )}
    </div>
  )
}
