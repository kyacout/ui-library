import forEach from 'lodash/forEach'
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import { FC, useEffect } from 'react'

import { Event, EventFormat } from '@Events/Base'
import { storageAvailable } from '@Globals/Storage'

declare global {
  interface Window {
    thEventsUnique: Record<string, boolean>
  }
}

if (typeof window !== 'undefined') {
  window.thEventsUnique = {}
}

const QUEUE_KEY = 'th-events-queue'

const unknownHandler = (formatted: EventFormat) => () => {
  console.log('[events]: manager: unknown handler', formatted)
}

export const getItems = (): EventFormat[] => {
  if (!storageAvailable('sessionStorage')) {
    return []
  }

  const itemsRaw = window.sessionStorage.getItem(QUEUE_KEY)

  try {
    const items = JSON.parse(itemsRaw)

    if (!isArray(items)) {
      return []
    }

    return items
  } catch (err) {
    console.log('[events] manager: get items failed', err)
    return []
  }
}

export const setItems = (items: EventFormat[]): void => {
  if (!storageAvailable('sessionStorage')) {
    return
  }

  try {
    window.sessionStorage.setItem(QUEUE_KEY, JSON.stringify(items))
  } catch (err) {
    console.log('[events] manager: set items failed', err)
    return
  }
}

export const pushItem = (formatted: EventFormat): void => {
  setItems([...getItems(), formatted])
}

export const clearItems = (): void => {
  if (!storageAvailable('sessionStorage')) {
    return
  }

  setItems([])
}

export const fireEvent = (formatted: EventFormat): void => {
  if (typeof window === 'undefined') {
    console.log('[events] manager: not supported via ssr', formatted)
    return
  }

  const func = get(window, formatted[0], unknownHandler(formatted))
  const args = formatted[1]
  const uniqueKey = formatted[2] || false

  if (uniqueKey) {
    if (window.thEventsUnique[uniqueKey]) {
      console.log('[events] manager: skip unique', formatted)
      return
    }

    window.thEventsUnique[uniqueKey] = true
  }

  console.log('[events] manager: fire', formatted)
  if (!isFunction(func)) {
    console.log('[events] manager: invalid function', formatted)
    return
  }

  try {
    console.log('[events] manager: calling func with args', formatted, func, args)
    func(...args)
  } catch (err) {
    console.log('[events] manager: failed to execute function', formatted, err)
  }
}

export const fireQueuedEvents = (): void => {
  console.log('[events] manager: fire all queued events')

  if (!storageAvailable('sessionStorage')) {
    return
  }

  try {
    forEach(getItems(), fireEvent)
  } finally {
    clearItems()
  }
}

export const handleEvent = (
  event: Event,
  queue: boolean = false,
): void => {
  console.log('[events] manager: handleEvent', event, queue)

  const item = event.transform()

  if (queue && storageAvailable('sessionStorage')) {
    pushItem(item)
    return
  }

  fireEvent(item)
}

export const FireQueuedEvents: FC = () => {
  useEffect(() => {
    fireQueuedEvents()
  }, [])

  return null
}
