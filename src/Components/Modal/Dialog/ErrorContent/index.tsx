import React, { FC } from 'react'

import WarningIcon from '@Assets/SVG/Warning'
import { SVGIcon } from '@Components/Icons'
import { ContentProps } from '@Components/Modal/Dialog'

import css from './index.styl'

type ErrorContentProps = Omit<ContentProps, 'variant'>

export const ErrorContent: FC<ErrorContentProps> = ({
  children,
  title,
}: ErrorContentProps) => (
  <div className={css.root}>
    <div className={css.iconWrapper}>
      <SVGIcon icon={WarningIcon} size="60px" />
    </div>
    <div className={css.title}>{title}</div>
    <div className={css.text}>{children}</div>
  </div>
)
