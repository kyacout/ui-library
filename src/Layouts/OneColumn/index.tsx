import React, { FC, ReactNode } from 'react'

import { CookieBar } from '@Components/CookieBar'
import { Footer } from '@Components/Footer'
import { PageViewEvent } from '@Events/PageView'

interface OneColumnProps {
  children: ReactNode
}

export const OneColumn: FC<OneColumnProps> = ({ children }: OneColumnProps) => {
  PageViewEvent.setHasNormalHeader(true)
  PageViewEvent.setHasSideBar(false)

  return (
    <div>
      <CookieBar />
      <header>
        <h1>Header</h1>
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  )
}
