import React, { FC, ReactNode } from 'react'

import css from './index.styl'

interface MainContainerProps {
  children: ReactNode
}

export const MainContainer: FC<MainContainerProps> = ({ children }: MainContainerProps) => (
  <div className={css.MainContainer}>
    <div className={css.ChildrenContainer}>{children}</div>
  </div>
)
