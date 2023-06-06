import clsx from 'clsx'
import React, { FC } from 'react'

import css from './index.styl'

interface TopProps {
  mb?: string
  separateLine?: boolean
  subtitle?: string
  title: string
}

export const Top: FC<TopProps> = ({
  mb = '10px',
  separateLine = false,
  subtitle,
  title,
}: TopProps) => (
  <div className={clsx(css.root, separateLine && css.separateLine)} style={{ marginBottom: mb }}>
    <h1>{title}</h1>
    {subtitle && <p>{subtitle}</p>}
  </div>
)
