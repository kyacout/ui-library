import React, { FC, ReactNode } from 'react'

import css from './Abundance.styl'

interface AbundanceProps {
  children: ReactNode
  count?: number
}

export const Abundance: FC<AbundanceProps> = (
  {
    children,
    count,
  }: AbundanceProps,
) => {
  if (!count) {
    return <>{children}</>
  }

  return (
    <div className={css.Abundance} style={{}}>
      {children}
      <span className={css.AbundanceBadge}>{count}</span>
    </div>
  )
}
