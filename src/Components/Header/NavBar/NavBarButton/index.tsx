import React, { FC } from 'react'

import css from './index.styl'

interface NavBarButtonProps {
  onCategoryClick: () => void
  onCategoryMouseEnter: () => void
  onCategoryMouseLeave: () => void
  title: string
}

export const NavBarButton: FC<NavBarButtonProps> = ({
  onCategoryClick,
  onCategoryMouseEnter,
  onCategoryMouseLeave,
  title,
}: NavBarButtonProps) => (
  <div
    className={css.NavBarButton}
    onClick={() => onCategoryClick()}
    onMouseEnter={() => onCategoryMouseEnter()}
    onMouseLeave={() => onCategoryMouseLeave()}
  >
    {title}
  </div>
)
