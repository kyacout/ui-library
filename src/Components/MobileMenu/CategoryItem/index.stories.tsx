import noop from 'lodash/noop'
import React from 'react'

import { CategoryItem } from '.'

export default {
  component: CategoryItem,
  title: 'Components/MobileMenu/CategoryItem',
}

export const Default = () => (
  <>
    <CategoryItem
      id="categories/10"
      onTopCategoryClick={noop}
      title="Rings"
    />
    <CategoryItem
      id="categories/11"
      onTopCategoryClick={noop}
      title="Earrings"
    />
    <CategoryItem
      id="categories/13"
      onTopCategoryClick={noop}
      title="Neckties"
    />
  </>
)
