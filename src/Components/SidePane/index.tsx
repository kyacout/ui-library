import noop from 'lodash/noop'
import React, { FC, ReactNode, useEffect } from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'

import { Backdrop } from '@Components/Backdrop'
import { enableBodyScroll, preventBodyScroll } from '@Globals/MiscHelpers'
import slideInLeftTransition from '@Globals/Stylus/Transitions/SlideInLeft.styl'

import css from './index.styl'

interface SidePaneProps {
  children: ReactNode
  isShowing: boolean
  onClose: () => void
  side?: string
  useBackdrop?: boolean
  useDelayOnClose?: boolean
}

export const SidePane: FC<SidePaneProps> = (
  {
    children,
    isShowing,
    onClose = noop,
    side = 'left',
    useBackdrop = true,
    useDelayOnClose = false,
  }: SidePaneProps,
) => {
  const styleToUse = side === 'left' ? slideInLeftTransition : slideInLeftTransition
  const paneClasses = [css.SidePane]
  const transitionClasses = {
    enter: styleToUse.enter,
    enterActive: styleToUse.enterActive,
    exit: styleToUse.exit,
    exitActive: useDelayOnClose ? styleToUse.exitActiveWithDelay : styleToUse.exitActive,
  }

  // Update pane classes
  if (isShowing) {
    paneClasses.push(css.isActive)
  }

  useEffect(() => {
    if (isShowing) {
      preventBodyScroll()
      return
    }

    enableBodyScroll()
  }, [isShowing])

  return (
    <>
      {useBackdrop ? <Backdrop isShowing={isShowing} onBackdropClick={onClose} /> : null}
      <CSSTransition
        classNames={transitionClasses}
        in={isShowing}
        mountOnEnter
        timeout={{ enter: 150, exit: useDelayOnClose ? 250 : 150 }}
        unmountOnExit
      >
        <div className={paneClasses.join(' ')}>{children}</div>
      </CSSTransition>
    </>
  )
}
