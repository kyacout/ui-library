import React, { FC } from 'react'

import { IconBar } from '@Components/Header/IconBar'
import { NavBar } from '@Components/Header/NavBar'

import css from './index.styl'

interface MenuProps {
  blocked: boolean
  onBackdropChange: (isOpen: boolean) => void
}

export const Menu: FC<MenuProps> = (
  {
    blocked,
    onBackdropChange,
  }: MenuProps,
) => (
  <div>
    {/* Desktop */}
    <NavBar
      blocked={blocked}
      onBackdropChange={isOpen => onBackdropChange(isOpen)}
    />

    {/* Mobile */}
    <div className={css.IconBarWrap}>
      <IconBar />
    </div>
  </div>
)
