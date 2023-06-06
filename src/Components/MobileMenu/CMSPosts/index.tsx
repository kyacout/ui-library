import first from 'lodash/first'
import React, { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { CloudinaryImage } from '@Components/CloudinaryImage'
import { Link } from '@Components/Link'
import { NavigationEvent } from '@Events/Navigation'
import { MetadataContext } from '@Globals/Metadata'
import { Name } from '@Globals/Resource'
import { storeURL } from '@Globals/Store'
import { Post } from '@Protos/cms/cms_pb'

import css from './index.styl'

interface CMSPostProps {
  post: Post.AsObject
  title: string
  type: 'articles' | 'collections'
}

const CMSPost: FC<CMSPostProps> = (
  {
    post,
    title,
    type,
  }: CMSPostProps,
) => (
  <>
    <span className={css.Title}>{title}</span>
    <Link
      className={css.CollectionItemContainer}
      event={new NavigationEvent({
        attributes: {
          dest_page_type: type,
          dest_page_type_id: new Name(post.name).id,
          source_id: 'mobile_menu',
        },
        eventName: 'nav_link_click',
      })}
      href={post.url}
    >
      <CloudinaryImage
        options={{ crop: 'thumb', height: 432, width: 720 }}
        path={post.imageUrl}
      />
      <span className={css.Description}>{post.title}</span>
    </Link>
  </>
)

export const CMSPosts: FC = () => {
  const { t } = useTranslation()
  const { cmsData } = useContext(MetadataContext)

  const article = first(cmsData?.latestArticles)
  const collection = first(cmsData?.latestCollections)

  return (
    <div className={css.CMSPostsWrapper}>
      <div className={css.MagazineItemWrapper}>
        {collection && (
          <CMSPost
            post={collection}
            title={t('header:NEW_COLLECTIONS_LABEL')}
            type="collections"
          />
        )}
        <Link
          className={css.AllCollectionsLink}
          event={new NavigationEvent({
            attributes: {
              dest_page_type: 'cms_category_collections',
              dest_page_type_id: '',
              source_id: 'mobile_menu',
            },
            eventName: 'nav_link_click',
          })}
          href={storeURL('collections')}
        >
          {t('header:VIEW_ALL_COLLECTIONS_LABEL')}
        </Link>
      </div>
      <div className={css.MagazineItemWrapperLastItem}>
        {article && (
          <CMSPost
            post={article}
            title={t('header:NEW_ARTICLES_LABEL')}
            type="articles"
          />
        )}
        <Link
          className={css.AllCollectionsLink}
          event={new NavigationEvent({
            attributes: {
              dest_page_type: 'cms_category_articles',
              dest_page_type_id: '',
              source_id: 'mobile_menu',
            },
            eventName: 'nav_link_click',
          })}
          href={storeURL('articles')}
        >
          {t('header:VIEW_ALL_ARTICLES_LABEL')}
        </Link>
      </div>
    </div>
  )
}
