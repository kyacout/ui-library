import React, { FC } from 'react'

import { Event } from '@Events/Base'
import { handleEvent } from '@Events/Manager'

type AProps = JSX.IntrinsicElements['a']

interface LinkProps extends AProps {
  event?: Event
  eventQueue?: boolean
}

export const Link: FC<LinkProps> = (
  {
    children,
    event,
    eventQueue = true,
    onClick,
    target,
    ...rest
  }: LinkProps,
) => (
  <a
    data-mp-link
    onClick={(e) => {
      // If we're opening a new tab, there's no reason to queue the event
      let shouldQueue = target !== '_blank'

      // If we're forcing the event to not be queued, honor it
      if (eventQueue === false) {
        shouldQueue = false
      }

      if (event) {
        handleEvent(event, shouldQueue)
      }

      if (onClick) {
        onClick(e)
      }
    }}
    target={target}
    {...rest}
  >
    {children}
  </a>
)
