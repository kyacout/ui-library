import React, { FC } from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'

import fadeTransition from '@Globals/Stylus/Transitions/Fade.styl'

import css from './index.styl'

interface BackdropProps {
  isShowing: boolean
  onBackdropClick?: () => void
  type?: string
}

export const Backdrop: FC<BackdropProps> = (
  {
    isShowing,
    onBackdropClick,
    type,
  }: BackdropProps,
) => {
  const classes = [css.Backdrop]
  if (type === 'behind-header') {
    classes.push(css.BehindHeader)
  }

  return (
    <CSSTransition
      classNames={fadeTransition}
      in={isShowing}
      mountOnEnter
      timeout={125}
      unmountOnExit
    >
      <div className={classes.join(' ')} onClick={onBackdropClick} />
    </CSSTransition>
  )
}
