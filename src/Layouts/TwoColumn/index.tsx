import React, { FC, ReactNode } from 'react'

import { Footer } from '@Components/Footer'
import { Header } from '@Components/Header'
import { SideBar } from '@Components/SideBar'
import { PageViewEvent } from '@Events/PageView'
import { MainContainer } from '@Layouts/MainContainer'

import css from './index.styl'

interface TwoColumnProps {
  children: ReactNode
}
export const TwoColumn: FC<TwoColumnProps> = ({ children }: TwoColumnProps) => {
  PageViewEvent.setHasNormalHeader(true)
  PageViewEvent.setHasSideBar(true)

  return (
    <>
      <Header />
      <MainContainer>
        <SideBar />
        <div className={css.MainContent}>{children}</div>
      </MainContainer>
      <Footer />
    </>
  )
}
