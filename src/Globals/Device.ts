import { storageAvailable } from '@Globals/Storage'

const FIRST_VISIT_OVER_KEY = 'mp-first-visit-over'

export type DeviceType =
  'desktop'
  | 'mobile'
  | 'tablet'

export const isFirstVisitOver = (): boolean => {
  if (!storageAvailable('sessionStorage')) {
    return false
  }

  if (window.sessionStorage.getItem(FIRST_VISIT_OVER_KEY) === 'true') {
    return false
  }

  window.sessionStorage.setItem(FIRST_VISIT_OVER_KEY, 'true')
  return true
}

export const isTouchDevice = (): boolean => {
  // https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
  const prefixes = ['', '-webkit-', '-moz-', '-o-', '-ms-', '']

  const mq = (query: string): boolean => window.matchMedia(query).matches

  if ('ontouchstart' in window
    || ((window as any).DocumentTouch && document instanceof (window as any).DocumentTouch)
  ) {
    return true
  }

  return mq(`(${prefixes.join('touch-enabled),(')}heartz)`)
}

export const getDeviceType = (): DeviceType => {
  const isTouch = isTouchDevice()
  const deviceWidth = window.screen?.width || window.innerWidth
  const isPortrait = window.innerWidth < window.innerHeight

  if (isPortrait && deviceWidth < 480) {
    return 'mobile'
  }

  if (!isPortrait && deviceWidth <= 915) {
    return 'mobile'
  }

  if (deviceWidth <= 1366 && isTouch) {
    return 'tablet'
  }

  return 'desktop'
}
