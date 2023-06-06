import map from 'lodash/map'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Link } from '@Components/Link'
import { NavigationEvent } from '@Events/Navigation'
import { Name } from '@Globals/Resource'
import { Item } from '@Protos/info/info_pb'

import css from './index.styl'

interface SectionPagesListProps {
  items: Item.AsObject[]
}

const PageItem: FC<Item.AsObject> = ({
  name,
  preview,
  title,
  url,
}: Item.AsObject) => {
  const { t } = useTranslation()

  return (
    <Link
      className={css.item}
      event={new NavigationEvent({
        attributes: {
          dest_page_type: 'info_section',
          dest_page_type_id: new Name(name).id,
          source_id: 'link_suggestion',
        },
        eventName: 'nav_link_click',
      })}
      href={url}
    >
      <span className={css.title}>{title}</span>
      <span className={css.description}>{preview}</span>
      <span className={css.readMore}>{t('info:READ_MORE_LABEL')}</span>
    </Link>
  )
}

export const SectionPagesList: FC<SectionPagesListProps> = ({
  items,
}: SectionPagesListProps) => (
  <div className={css.root}>
    {map(items, item => <PageItem key={item.name} {...item} />)}
  </div>
)
