import clsx from 'clsx'
import React, { FC } from 'react'

import css from './index.styl'

export interface ProgressProps {
  /**
   * parent must have position: relative
   */
  center?: boolean
  color?: 'grey' | 'primary' | 'white'
  size?: 'x-small' | 'small'
}

export const Progress: FC<ProgressProps> = (
  {
    center = false,
    color = 'primary',
    size = 'small',
  }: ProgressProps,
) => (
  <div
    className={clsx(
      css.Progress,
      center && css.ProgressCenter,
      color === 'grey' && css.ProgressColorGrey,
      color === 'primary' && css.ProgressColorPrimary,
      color === 'white' && css.ProgressColorWhite,
      size === 'small' && css.ProgressSizeSmall,
      size === 'x-small' && css.ProgressSizeXSmall,
    )}
  />
)
