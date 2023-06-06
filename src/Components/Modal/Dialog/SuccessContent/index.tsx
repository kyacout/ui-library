import clsx from 'clsx'
import React, { FC } from 'react'

import CheckIcon from '@Assets/SVG/Check'
import StarBgIcon from '@Assets/SVG/StarBg'
import { SVGIcon } from '@Components/Icons'
import { ContentProps } from '@Components/Modal/Dialog'

import css from './index.styl'

type SuccessContentProps = Omit<ContentProps, 'variant'>

export const SuccessContent: FC<SuccessContentProps> = ({
  children,
  title,
}: SuccessContentProps) => (
  <div className={css.root}>
    <div className={css.iconWrapper}>
      <div className={clsx(css.icon, css.bgIcon)}>
        <SVGIcon icon={StarBgIcon} size="100px" />
      </div>
      <div className={clsx(css.icon, css.mainIcon)}>
        <SVGIcon icon={CheckIcon} size="50px" />
      </div>
    </div>
    <div className={css.title}>{title}</div>
    <div className={css.text}>{children}</div>
  </div>
)
