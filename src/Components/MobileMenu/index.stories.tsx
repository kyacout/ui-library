import noop from 'lodash/noop'
import React from 'react'

import { MobileMenu } from '.'

export default {
  component: MobileMenu,
  title: 'Components/MobileMenu',
}

export const Default = () => (
  <MobileMenu
    closeMobileMenu={noop}
    isMenuOpen
    isSubMenuOpen={false}
    onCloseSubCategory={noop}
    onTopCategoryClick={noop}
    selectedCategoryName=""
    useDelayOnClose={false}
  />
)
