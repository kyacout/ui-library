import { CategoryNested } from '@Globals/Metadata'

interface Column {
  categories: CategoryNested[]
  id: string
}

export const makeColumns = (categories: CategoryNested[]): Column[] => {
  const maxColumns = 4
  const columnMinLength = Math.floor(categories.length / maxColumns)
  const extraItems = categories.length - (maxColumns * columnMinLength)
  const first = columnMinLength + (extraItems > 0 ? 1 : 0)
  const second = columnMinLength + (extraItems > 1 ? 1 : 0)
  const third = columnMinLength + (extraItems > 2 ? 1 : 0)

  const columns: Column[] = categories.reduce((prev, category, index) => {
    if (index < first) {
      prev[0].categories.push(category)
    } else if (index < first + second) {
      prev[1].categories.push(category)
    } else if (index < first + second + third) {
      prev[2].categories.push(category)
    } else {
      prev[3].categories.push(category)
    }

    return prev
  }, [
    { categories: [], id: 'first' },
    { categories: [], id: 'second' },
    { categories: [], id: 'third' },
    { categories: [], id: 'fourth' },
  ])

  return columns
}
