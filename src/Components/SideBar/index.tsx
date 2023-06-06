import React from 'react'

import { GetInspired } from './GetInspired'
import css from './index.styl'
import { Newsletter } from './Newsletter'
import { SideNav } from './SideNav'

export const SideBar = () => (
  <div className={css.SideBar}>
    <SideNav />
    <Newsletter />
    <GetInspired />
  </div>
)
