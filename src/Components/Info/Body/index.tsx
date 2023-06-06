import React, { FC, ReactNode } from 'react'

import css from './index.styl'

interface BodyProps {
  children: ReactNode
  title?: string
}

export const Body: FC<BodyProps> = ({
  children,
  title,
}: BodyProps) => (
  <div className={css.root}>
    {title && <p className={css.gridTitle}>{title}</p>}
    {children}
  </div>
)
