interface Brand {
  objectID: string
  type: 'brand'
}

interface Category {
  objectID: string
  type: 'category'
}

interface FreeText {
  type: 'freetext'
}

interface Input {
  type: 'input'
}

interface PreviousSearch {
  id: string
  type: 'previoussearch'
}

interface Product {
  objectID: string
  type: 'product'
}

export type SearchSelection = Brand | Category | FreeText | Input | PreviousSearch | Product
