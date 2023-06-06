import clsx from 'clsx'
import React, { FC, ReactNode } from 'react'

import css from './IconWithLabel.styl'

export interface IconWithLabelProps {
  children: ReactNode
  label: string
  smallTextBelowPhablet?: boolean
  smallTextBelowPhone?: boolean
}

export const IconWithLabel: FC<IconWithLabelProps> = (
  {
    children,
    label,
    smallTextBelowPhablet = false,
    smallTextBelowPhone = false,
  }: IconWithLabelProps,
) => (
  <div className={clsx(
    css.root,
    smallTextBelowPhablet && css.smallTextBelowPhablet,
    smallTextBelowPhablet && css.smallTextBelowPhone,
    smallTextBelowPhone && css.smallTextBelowPhone,
  )}
  >
    {/* Icon */}
    {children}

    {/* Text */}
    <span className={css.text}>{label}</span>
  </div>
)
