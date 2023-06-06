import clsx from 'clsx'
import React, { Children, FC, ReactElement } from 'react'

import css from './index.styl'

interface BreadcrumbProps {
  children: ReactElement
  isFirst: boolean
}

const Breadcrumb: FC<BreadcrumbProps> = ({ children, isFirst }: BreadcrumbProps) => (
  <>
    {!isFirst && <div className={css.SplitLine}>/</div>}
    <div className={css.Item}>
      {children}
    </div>
  </>
)

interface BreadcrumbsProps {
  children: ReactElement | ReactElement[]
  hideOnSmallerScreens?: boolean
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  children,
  hideOnSmallerScreens = false,
}: BreadcrumbsProps) => (
  <section className={clsx(css.BreadcrumbsWrap, hideOnSmallerScreens && css.HideSmallerScreens)}>
    {Children.map(children, (child, i) => (
      <Breadcrumb isFirst={i === 0}>
        {child}
      </Breadcrumb>
    ))}
  </section>
)
