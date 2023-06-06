import find from 'lodash/find'
import reduce from 'lodash/reduce'
import React, { FC, useContext, useMemo } from 'react'

import { CategoryNested, MetadataContext } from '@Globals/Metadata'

import css from './index.styl'
import { MegaMenuAllCategories } from './MegaMenuAllCategories'
import { MegaMenuSingleCategory } from './MegaMenuSingleCategory'

const categoryOne = [
  'categories/13', 'categories/130', 'categories/35', 'categories/33',
  'categories/68', 'categories/201', 'categories/36', 'categories/195',
]
const categoryTwo = [
  'categories/11', 'categories/14', 'categories/6', 'categories/7',
  'categories/10',
]
const categoryThree = [
  'categories/63', 'categories/5',
]

const filterCategories = (
  categoriesMenu: CategoryNested[],
  categoryNames: string[],
): CategoryNested[] => useMemo(
  () => reduce(
    categoryNames,
    (prev, categoryName) => {
      const category = find(categoriesMenu, ['name', categoryName])

      if (!category) {
        return prev
      }

      return [...prev, category]
    },
    [] as CategoryNested[],
  ),
  [categoriesMenu, categoryNames],
)

interface MegaMenuProps {
  activeID?: number
  isOpen: boolean
}

export const MegaMenu: FC<MegaMenuProps> = (
  {
    activeID,
    isOpen,
  }: MegaMenuProps,
) => {
  const megaMenuClasses = [css.MegaMenu]
  const { categoriesMenu } = useContext(MetadataContext)
  const singleCategoryOne = filterCategories(categoriesMenu, categoryOne)
  const singleCategoryTwo = filterCategories(categoriesMenu, categoryTwo)
  const singleCategoryThree = filterCategories(categoriesMenu, categoryThree)

  if (isOpen) {
    megaMenuClasses.push(css.IsActive)
  }

  return (
    <div className={megaMenuClasses.join(' ')}>
      <MegaMenuAllCategories
        activeID={activeID}
        categories={categoriesMenu}
        menuID={0}
      />
      <MegaMenuSingleCategory
        activeID={activeID}
        categories={singleCategoryOne}
        menuID={1}
      />
      <MegaMenuSingleCategory
        activeID={activeID}
        categories={singleCategoryTwo}
        menuID={2}
      />
      <MegaMenuSingleCategory
        activeID={activeID}
        categories={singleCategoryThree}
        menuID={3}
      />
    </div>
  )
}
