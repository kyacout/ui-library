import clsx from 'clsx'
import noop from 'lodash/noop'
import React, { useContext, useEffect, useRef } from 'react'

import { MetadataContext } from '@Globals/Metadata'

import css from './index.styl'

export const TrustPilot = () => {
  const { store } = useContext(MetadataContext)
  const ref = useRef(null)

  const trustPilotBusinessID = store?.config?.trustpilotBusinessId
  const trustPilotDomain = store?.config?.trustpilotDomain
  const localeCode = store?.config?.localeCode
  const storeHost = store?.config?.urlDomain

  const shouldRender = trustPilotBusinessID && trustPilotDomain

  useEffect(() => {
    if (!shouldRender) {
      return noop
    }

    const interval = setInterval(() => {
      const trustpilot = (window as any).Trustpilot
      if (trustpilot) {
        trustpilot.loadFromElement(ref.current, true)
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [shouldRender])

  if (!shouldRender) {
    return <div className={clsx(css.Element, css.Top, css.TrustPilot)} />
  }

  return (
    <div
      className={clsx('trustpilot-widget', css.Element, css.Top, css.TrustPilot)}
      data-businessunit-id={trustPilotBusinessID}
      data-locale={localeCode}
      data-stars="4,5"
      data-style-height="130px"
      data-style-width="100%"
      data-template-id="53aa8912dec7e10d38f59f36"
      data-theme="light"
      ref={ref}
    >
      <a href={`https://${trustPilotDomain}/review/${storeHost}`} rel="noreferrer" target="_blank">
        Trustpilot
      </a>
    </div>
  )
}
