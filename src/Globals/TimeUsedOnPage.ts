import camelCase from 'lodash/camelCase'
import omitBy from 'lodash/omitBy'
import { useEffect } from 'react'

import { Event } from '@Events/Base'
import { handleEvent } from '@Events/Manager'
import { OtherEvent } from '@Events/Other'
import { getPerformanceMetricValue } from '@Globals/Performance'

export const TimeUsedOnPage = () => {
  // Send time used on page events to GTM and mParticle
  useEffect(() => {
    let time = 0
    let timer: NodeJS.Timeout
    let eventName: string

    if (Event.page.type) {
      eventName = camelCase(`timeUsedOnPage-${Event.page.type}`)
    }

    const bumpTime = () => {
      time += 1

      if (time >= 90) {
        clearInterval(timer)
      }

      if (time === 10 || time === 30 || time === 60 || time === 90) {
        if (eventName && typeof window !== 'undefined') {
          (window as any).dataLayer.push({
            event: 'TimeUsedOnPage',
            timeUsed: time,
            trackingEventName: eventName,
          })
        }

        const performanceMetrics = omitBy(
          {
            perf_web_vitals_fcp: getPerformanceMetricValue('FCP'),
            perf_web_vitals_fid: getPerformanceMetricValue('FID'),
            perf_web_vitals_lcp: getPerformanceMetricValue('LCP'),
            perf_web_vitals_ttfb: getPerformanceMetricValue('TTFB'),
          },
          value => value === false,
        )

        const event = new OtherEvent({
          attributes: {
            ...performanceMetrics,
            time_in_seconds: time,
          },
          eventName: 'time_used_on_page',
        })

        handleEvent(event)
      }
    }

    // Use requestAnimationFrame to only trigger bumpTime if the tab is active
    timer = setInterval(() => {
      if (!window.requestAnimationFrame) {
        bumpTime()
        return
      }

      const raf = window.requestAnimationFrame(() => {
        bumpTime()
      })

      // If RAF wasn't called within 500ms, cancel it
      setTimeout(() => {
        window.cancelAnimationFrame(raf)
      }, 500)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return null
}
