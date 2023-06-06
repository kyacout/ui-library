import React, { FC, useContext } from 'react'
import useSWR from 'swr'

import { Button } from '@Components/Button'
import { CloudinaryImage } from '@Components/CloudinaryImage'
import { Modal, ModalProps } from '@Components/Modal'
import { MetadataContext } from '@Globals/Metadata'
import { storeURL } from '@Globals/Store'

import css from './index.styl'

interface CountryDetectionData {
  curr: string
  dist: string
  hl: string
  redirect: string
}

interface CountryDetectionModalProps extends ModalProps {
  geoIPCountryCode: string
}

export const CountryDetectionModal: FC<CountryDetectionModalProps> = ({
  geoIPCountryCode,
  onHide,
  ...props
}: CountryDetectionModalProps) => {
  const { page, store } = useContext(MetadataContext)
  const country = store?.config?.countryCode || ''

  const params = new URLSearchParams()
  params.set('country', geoIPCountryCode)
  params.set('pagetype', page?.type || '')
  params.set('pagetypeid', page?.id || '')
  const countryDetectionURL = storeURL('personality/index/geo', params)

  const { data } = useSWR(
    countryDetectionURL,
    async (input: RequestInfo, init?: RequestInit): Promise<CountryDetectionData | null> => {
      const res = await fetch(input, init)
      const json = await res.json()
      if (json.status !== 'OK') {
        return null
      }
      return JSON.parse(json.geoResult)
    },
  )

  const curFlag = `flag-${country.toLowerCase()}.svg`
  const destFlag = `flag-${geoIPCountryCode.toLowerCase()}.svg`

  if (!data) {
    return null
  }

  return (
    <Modal hideCloseButton onHide={onHide} {...props}>
      <span className={css.Title}>{data.hl}</span>
      <div className={css.ButtonsWrap}>
        <Button
          color="dark"
          onClick={onHide}
          variant="outlined"
        >
          <div className={css.ButtonContent}>
            <CloudinaryImage
              alt={country}
              options={{ height: 32, width: 32 }}
              path={`frontend/country-flags/${curFlag}`}
            />
            <span className={css.ButtonText}>{data.curr}</span>
          </div>
        </Button>
        <Button
          color="dark"
          onClick={() => {
            const hostname = window.location.hostname.split('uiLibrary')
            if (hostname.length === 1) {
              window.location.href = data.redirect
              return
            }
            const url = new URL(data.redirect)
            const { searchParams } = url
            searchParams.append('utm_source', `uiLibrary${hostname[hostname.length - 1]}`)
            searchParams.append('utm_medium', 'internal+referral')
            searchParams.append('utm_campaign', 'geolocation+overlay')
            window.location.href = url.toString()
          }}
          variant="outlined"
        >
          <div className={css.ButtonContent}>
            <CloudinaryImage
              alt={geoIPCountryCode}
              options={{ height: 32, width: 32 }}
              path={`frontend/country-flags/${destFlag}`}
            />
            <span className={css.ButtonText}>{data.dist}</span>
          </div>
        </Button>
      </div>
    </Modal>
  )
}
