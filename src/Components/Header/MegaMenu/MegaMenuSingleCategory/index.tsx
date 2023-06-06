import clsx from 'clsx'
import map from 'lodash/map'
import React, { FC } from 'react'

import { makeColumns } from '@Components/Header/helpers'
import { CMSPosts } from '@Components/Header/MegaMenu/CMSPosts'
import { Link } from '@Components/Link'
import { NavigationEvent } from '@Events/Navigation'
import { CategoryNested } from '@Globals/Metadata'
import { Name } from '@Globals/Resource'
import { storeURL } from '@Globals/Store'
import { useTranslation } from '@Globals/Translations'

import css from './index.styl'

interface MegaMenuSingleCategoryProps {
  activeID?: number
  categories: CategoryNested[]
  menuID: number
}

interface SingleCategoryColumnProps {
  categories: CategoryNested[]
}

interface SingleCategoryColumnItemProps {
  category: CategoryNested
}

interface SingleCategoryItemProps {
  category: CategoryNested
  isParent?: boolean
  title?: string,
}

const SingleCategoryItem: FC<SingleCategoryItemProps> = (
  {
    category,
    isParent = false,
    title = '',
  }: SingleCategoryItemProps,
) => {
  const categoryURL = storeURL(category.slug)

  return (
    <Link
      className={clsx(
        isParent && css.CategoryItem,
        !isParent && css.SubCategoryItem,
      )}
      event={new NavigationEvent({
        attributes: {
          dest_page_type: 'category',
          dest_page_type_id: new Name(category.name).id,
          source_id: 'mega_menu',
        },
        eventName: 'nav_link_click',
      })}
      href={categoryURL}
    >
      {title || category.title}
    </Link>
  )
}

const SingleCategoryColumn: FC<SingleCategoryColumnProps> = (
  {
    categories,
  }: SingleCategoryColumnProps,
) => (
  <div className={css.CategoryColumn}>
    {map(categories, category => (
      <SingleCategoryColumnItem key={category.name} category={category} />
    ))}
  </div>
)

const SingleCategoryColumnItem: FC<SingleCategoryColumnItemProps> = (
  {
    category,
  }: SingleCategoryColumnItemProps,
) => {
  const { t } = useTranslation()

  return (
    <div className={css.CategoryItemsWrap}>
      {/* Parent category */}
      <SingleCategoryItem
        category={category}
        isParent
      />

      {/* View all */}
      <SingleCategoryItem
        category={category}
        title={t('header:HEADER_MOBILE_MENU_VIEW_ALL_LABEL')}
      />

      {/* Show children */}
      {category.children && (
        map(category.children, item => (
          <SingleCategoryItem
            key={item.name}
            category={item}
          />
        ))
      )}
    </div>
  )
}

export const MegaMenuSingleCategory: FC<MegaMenuSingleCategoryProps> = (
  {
    activeID,
    categories,
    menuID,
  }: MegaMenuSingleCategoryProps,
) => {
  const menuClasses = [css.MegaMenuSingleCategory, '-j-mega-menu-page']
  const columns = makeColumns(categories)

  // Set extra classes
  if (activeID === menuID) {
    menuClasses.push(css.IsActive)
  }

  return (
    <div className={menuClasses.join(' ')}>
      {/* Left side */}
      <div className={css.LeftSide}>
        {/* Categories */}
        <div className={css.CategoriesWrap}>
          {map(columns, ({ categories: columnCategories, id }) => (
            <SingleCategoryColumn
              key={id}
              categories={columnCategories}
            />
          ))}
        </div>
      </div>

      {/* Right side */}
      <CMSPosts />
    </div>
  )
}
