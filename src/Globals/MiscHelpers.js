// Locks the body at its current position so you can't scroll
function preventBodyScroll(hideScrollBar = false) {
  document.body.noSrcoll = true
  document.body.bodyScrollTop = window.pageYOffset
  document.body.style.position = 'fixed'
  document.body.style.top = `-${document.body.bodyScrollTop}px`

  function getScrollbarWidth() {
    const outer = document.createElement('div')
    outer.style.visibility = 'hidden'
    outer.style.width = '100px'
    outer.style.msOverflowStyle = 'scrollbar' // needed for WinJS apps

    document.body.appendChild(outer)

    const widthNoScroll = outer.offsetWidth
    // Force scrollbars
    outer.style.overflow = 'scroll'

    // Add innerdiv
    const inner = document.createElement('div')
    inner.style.width = '100%'
    outer.appendChild(inner)

    const widthWithScroll = inner.offsetWidth

    // Remove divs
    outer.parentNode.removeChild(outer)

    return widthNoScroll - widthWithScroll
  }

  if (hideScrollBar) {
    const htmlTag = document.getElementsByTagName('html')[0]
    htmlTag.style.overflowY = 'hidden'
    document.body.style.paddingRight = `${getScrollbarWidth()}px`
  }
}

// Enables the body to be scrolled again
function enableBodyScroll() {
  if (document.body.noSrcoll) {
    document.body.noSrcoll = false
    document.body.style.position = 'relative'
    document.body.style.top = null
    window.scrollTo(0, document.body.bodyScrollTop)

    const htmlTag = document.getElementsByTagName('html')[0]
    htmlTag.style.overflowY = 'scroll'
    document.body.style.paddingRight = '0px'
  }
}

export {
  preventBodyScroll,
  enableBodyScroll,
}
