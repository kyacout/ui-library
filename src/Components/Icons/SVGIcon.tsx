import clsx from 'clsx'
import React, { FC, SVGProps } from 'react'

import css from './SVGIcon.styl'

interface SVGIconProps {
  color?: string
  icon: FC<SVGProps<SVGSVGElement>>
  size?: string
}

export const SVGIcon: FC<SVGIconProps> = (
  {
    color = 'greyDark',
    icon: Icon,
    size = '20px',
  }: SVGIconProps,
) => (
  <div
    className={css.SVGIcon}
    style={{ height: size, width: size }}
  >
    <Icon
      className={clsx(
        css.SVGIconInner,
        color === 'primary' && css.ColorPrimary,
      )}
    />
  </div>
)
