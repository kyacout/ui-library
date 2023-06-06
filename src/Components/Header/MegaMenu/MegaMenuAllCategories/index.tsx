import React, { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { makeColumns } from '@Components/Header/helpers'
import { CMSPosts } from '@Components/Header/MegaMenu/CMSPosts'
import { Link } from '@Components/Link'
import { NavigationEvent } from '@Events/Navigation'
import { CategoryNested, MetadataContext } from '@Globals/Metadata'
import { Name } from '@Globals/Resource'

import css from './index.styl'

interface MegaMenuAllCategories {
  activeID?: number
  categories: CategoryNested[]
  menuID: number
}

const CategoryItem = (category) => {
  const { store } = useContext(MetadataContext)
  const urlFull = store?.config?.urlFull || '/'

  return (
    <Link
      key={category.name}
      className={css.CategoryItem}
      event={new NavigationEvent({
        attributes: {
          dest_page_type: 'category',
          dest_page_type_id: new Name(category.name).id,
          source_id: 'mega_menu',
        },
        eventName: 'nav_link_click',
      })}
      href={urlFull + category.slug}
    >
      {category.title}
    </Link>
  )
}

export const MegaMenuAllCategories: FC<MegaMenuAllCategories> = (
  {
    activeID,
    categories,
    menuID,
  }: MegaMenuAllCategories,
) => {
  const { t } = useTranslation()
  const menuClasses = [css.MegaMenuAllCategories, '-j-mega-menu-page']
  const columns = makeColumns(categories)

  // Set extra classes
  if (activeID === menuID) {
    menuClasses.push(css.IsActive)
  }

  return (
    <div className={menuClasses.join(' ')}>
      {/* Left side */}
      <div className={css.LeftSide}>
        {/* Header */}
        <div className={css.Header}>
          <span>{t('header:A_TO_Z_LABEL')}</span>
        </div>

        {/* Categories */}
        <div className={css.CategoriesWrap}>
          {columns.map(column => (
            <div key={column.id} className={css.CategoryColumn}>
              {column.categories.map(CategoryItem)}
            </div>
          ))}
        </div>
      </div>

      {/* Right side */}
      <CMSPosts />
    </div>
  )
}
