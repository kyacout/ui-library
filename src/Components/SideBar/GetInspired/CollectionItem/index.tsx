import React, { FC } from 'react'

import { CloudinaryImage } from '@Components/CloudinaryImage'
import { Link } from '@Components/Link'
import { NavigationEvent } from '@Events/Navigation'
import { Name } from '@Globals/Resource'

import css from './index.styl'

interface CollectionItemProps {
  brandName?: string
  imageURL: string
  link: string
  name: string
  title: string
}

export const CollectionItem: FC<CollectionItemProps> = (
  {
    brandName,
    imageURL,
    link,
    name,
    title,
  }: CollectionItemProps,
) => (
  <Link
    className={css.CollectionItemContainer}
    event={new NavigationEvent({
      attributes: {
        dest_page_type: 'collections',
        dest_page_type_id: new Name(name).id,
        source_id: 'side_bar',
      },
      eventName: 'nav_link_click',
    })}
    href={link}
  >
    <CloudinaryImage
      alt={title}
      brand={new Name(brandName)}
      options={{ width: 210 }}
      path={imageURL}
    />
    <span className={css.Title}>{title}</span>
  </Link>
)
