import { useRef } from 'react'

let value = 0
const getUniqueID = () => {
  value += 1

  return value
}

export const useComponentID = (prefix = 'unique') => {
  const ref = useRef(null)

  if (ref.current === null) {
    ref.current = `${prefix}-${getUniqueID()}`
  }

  return ref.current
}
