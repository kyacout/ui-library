export const getClosestWithClassName = (element: Node, className: string) => {
  if (!element) {
    return null
  }

  let node = element

  do {
    const { classList } = (node as HTMLElement)

    if (classList && classList.contains(className)) {
      return node
    }

    node = node.parentNode
  } while (node)

  return null
}
