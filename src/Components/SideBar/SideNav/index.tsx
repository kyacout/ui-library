import map from 'lodash/map'
import React, { useContext } from 'react'

import { MetadataContext } from '@Globals/Metadata'

import css from './index.styl'
import { MainCategory } from './MainCategory'

export const SideNav = () => {
  const { categoriesMenu } = useContext(MetadataContext)

  return (
    <div className={css.SideNavWrapper}>
      {map(categoriesMenu, MainCategory)}
    </div>
  )
}
