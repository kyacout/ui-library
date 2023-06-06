import get from 'lodash/get'
import React, { FC, useContext, useEffect } from 'react'
import useSWR from 'swr'

import { Modal, ModalProps } from '@Components/Modal'
import { Loading } from '@Components/Modal/Loading'
import { handleEvent } from '@Events/Manager'
import { OtherEvent } from '@Events/Other'
import { MetadataContext } from '@Globals/Metadata'
import { storeURL } from '@Globals/Store'
import { UserContext } from '@Globals/User'

import css from './index.styl'
import { ShippingIntro } from './Intro'
import { ShippingOptionProps, ShippingOptions } from './Options'
import { ShippingOutro } from './Outro'
import { ShippingToCountry } from './ToCountry'

interface ShippingInfoModalProps extends ModalProps {
  sourceID: string
}

const fetcher = async (
  input: RequestInfo,
  init?: RequestInit,
): Promise<ShippingOptionProps[] | null> => {
  const res = await fetch(input, init)

  const json = await res.json()

  return get(json, 'deliveryInfo', [])
}

export const ShippingInfoModal: FC<ShippingInfoModalProps> = (
  {
    button,
    show,
    sourceID,
    ...rest
  }: ShippingInfoModalProps,
) => {
  const { store } = useContext(MetadataContext)
  const { userData } = useContext(UserContext)

  useEffect(() => {
    if (!show) {
      return
    }

    handleEvent(new OtherEvent({
      attributes: {
        source_id: sourceID,
      },
      eventName: 'delivery_details_overlay_open',
    }))
  }, [show])

  const url = storeURL('pakkelabels/info', new URLSearchParams({ output: 'json' }))

  const { data: shippingOptions, isValidating } = useSWR(show && url, fetcher)

  const isLoading = !store || !userData || isValidating

  return (
    <Modal {...rest} button="close" show={show}>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className={css.root}>
          <ShippingToCountry />
          <ShippingIntro />
          <ShippingOptions options={shippingOptions} />
          <ShippingOutro />
        </div>
      )}
    </Modal>
  )
}
