import React, { cloneElement, FC } from 'react'
import { TransitionCallbacks } from 'react-overlays/esm/types'
import Transition, { ENTERED, ENTERING, TransitionProps } from 'react-transition-group/Transition'

const duration = 125

const defaultStyles = {
  opacity: 0,
  transition: `opacity ${duration}ms linear`,
}

const transitionStyles = {
  [ENTERED]: { opacity: 1 },
  [ENTERING]: { opacity: 1 },
}

type FadeProps = TransitionProps & TransitionCallbacks & {
  appear?: boolean
  children?: any
  in: boolean
  unmountOnExit?: boolean
}

export const Fade: FC<FadeProps> = ({ children, ...props }: FadeProps) => (
  <Transition {...props} timeout={duration}>
    {(status, innerProps) => cloneElement(children, {
      ...innerProps,
      className: children.props.className,
      style: {
        ...defaultStyles,
        ...transitionStyles[status],
      },
    })}
  </Transition>
)
