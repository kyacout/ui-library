import noop from 'lodash/noop'
import React, { FC } from 'react'

import AngleRightIcon from '@Assets/SVG/AngleRight'
import { CategoryIcon, SVGIcon } from '@Components/Icons'

import css from './index.styl'

interface CategoryItemProps {
  id: string
  onTopCategoryClick?: () => void
  title: string
}

export const CategoryItem: FC<CategoryItemProps> = (
  {
    id,
    onTopCategoryClick = noop,
    title,
  }: CategoryItemProps,
) => (
  <div className={css.Item} onClick={() => onTopCategoryClick()}>
    <div className={css.Icon}>
      <CategoryIcon name={id} />
    </div>

    {/* Right side */}
    <div className={css.RightSide}>
      {/* Text */}
      <span className={css.Title}>{title}</span>

      {/* Arrow */}
      <div className={css.Arrow}>
        <SVGIcon icon={AngleRightIcon} size="14px" />
      </div>
    </div>
  </div>
)
