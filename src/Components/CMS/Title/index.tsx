import clsx from 'clsx'
import React, { FC } from 'react'

import css from './index.styl'

interface TitleProps {
  subtitle?: string
  title: string
  type: 'h1' | 'h2' | 'h3'
}

const TitleText: FC<TitleProps> = ({ title, type }: TitleProps) => {
  if (type === 'h1') {
    return (
      <h1>{title}</h1>
    )
  }
  if (type === 'h2') {
    return (
      <h2>{title}</h2>
    )
  }
  return (
    <h3>{title}</h3>
  )
}

export const Title: FC<TitleProps> = ({
  subtitle,
  type,
  ...props
}: TitleProps) => (
  <div className={clsx(css.root, css[`type${type}`])}>
    <TitleText type={type} {...props} />
    {subtitle && (type === 'h1' || type === 'h2') && (
      <p className={css.subtitle}>{subtitle}</p>
    )}
  </div>
)
