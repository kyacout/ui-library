import clsx from 'clsx'
import React, { FC } from 'react'

import css from './index.styl'

interface TextColumnProps {
  text: string
  variant?: 'single-column' | 'two-column'
}

export const TextColumn: FC<TextColumnProps> = ({
  text,
  variant = 'single-column',
}: TextColumnProps) => (
  <div className={clsx(css.root, variant === 'two-column' && css.twoColumns)}>
    {text}
  </div>
)
