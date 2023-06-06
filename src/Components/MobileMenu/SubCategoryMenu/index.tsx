import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import AngleRightIcon from '@Assets/SVG/AngleRight'
import { CategoryIcon, SVGIcon } from '@Components/Icons'
import { SidePane } from '@Components/SidePane'
import { CategoryNested } from '@Globals/Metadata'

import css from './index.styl'
import { SubCategoryItem } from './SubCategoryItem'

interface SubCategoryMenuProps {
  category: CategoryNested
  isShowing: boolean
  onCloseClick: () => void
}

export const SubCategoryMenu: FC<SubCategoryMenuProps> = (
  {
    category,
    isShowing,
    onCloseClick,
  }: SubCategoryMenuProps,
) => {
  const { t } = useTranslation()

  return (
    <SidePane isShowing={isShowing} onClose={onCloseClick} useBackdrop={false}>
      {/* Header */}
      <div className={css.MenuHeader}>
        <div className={css.BackIcon} onClick={onCloseClick}>
          <SVGIcon icon={AngleRightIcon} size="16px" />
        </div>
        <div className={css.TitleWrap}>
          <div className={css.TitleIcon}>
            <CategoryIcon name={category.name} />
          </div>
          <span>{category.title}</span>
        </div>
      </div>

      {/* Body */}
      <div className={css.MenuBody}>
        {/* View all link */}
        <SubCategoryItem
          count={10}
          name={category.name}
          slug={category.slug}
          title={t('header:HEADER_MOBILE_MENU_VIEW_ALL_LABEL')}
        />

        {/* Rest of sub categories */}
        {category.children && category.children.map(child => (
          <SubCategoryItem
            key={child.name}
            count={123}
            name={child.name}
            slug={child.slug}
            title={child.title}
          />
        ))}
      </div>

    </SidePane>
  )
}
