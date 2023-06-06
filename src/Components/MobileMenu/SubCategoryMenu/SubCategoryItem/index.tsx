import React, { FC, useContext } from 'react'

import AngleRightIcon from '@Assets/SVG/AngleRight'
import { SVGIcon } from '@Components/Icons'
import { Link } from '@Components/Link'
import { NavigationEvent } from '@Events/Navigation'
import { MetadataContext } from '@Globals/Metadata'
import { Name } from '@Globals/Resource'

import css from './index.styl'

interface SubCategoryItemProps {
  count: number
  name: string
  slug: string
  title: string
}

export const SubCategoryItem: FC<SubCategoryItemProps> = (
  {
    count,
    name,
    slug,
    title,
  }: SubCategoryItemProps,
) => {
  const { store } = useContext(MetadataContext)

  const urlFull = store?.config?.urlFull || '/'

  return (
    <Link
      className={css.Item}
      event={new NavigationEvent({
        attributes: {
          dest_page_type: 'category',
          dest_page_type_id: new Name(name).id,
          source_id: 'mobile_menu',
        },
        eventName: 'nav_link_click',
      })}
      href={urlFull + slug}
    >
      <span className={css.ItemTitle}>
        {title}
        <span className={css.ItemCount}>
          (
          {count}
          )
        </span>
      </span>

      {/* Arrow */}
      <div className={css.ArrowWrap}>
        <SVGIcon icon={AngleRightIcon} size="14px" />
      </div>
    </Link>
  )
}
