/* eslint-disable react/no-danger */
import map from 'lodash/map'
import React, { FC } from 'react'

import { svgURL } from '@Globals/Cloudinary'
import { useTranslation } from '@Globals/Translations'

import css from './Options.styl'

export interface ShippingOptionProps {
  companyId: string
  deliveryTime: string
  eta: string
  price: string
  type: string
}

interface ShippingOptionsProps {
  options: ShippingOptionProps[]
}

const ShippingOption = (option: ShippingOptionProps) => {
  const { t } = useTranslation()

  return (
    <div className={css.shippingOption}>
      <img
        alt=""
        src={svgURL(`frontend/shipping-logos/${option.companyId}.svg`)}
      />
      <div>
        <p>
          {option.type}
          {' - '}
          <span dangerouslySetInnerHTML={{ __html: option.deliveryTime }} />
        </p>
        <p>
          {t('header:DELIVERY_INFO_RECEIVE_IT_LABEL')}
          :
          {' '}
          <span className={css.greenText}>{option.eta}</span>
        </p>
      </div>
      <div className={css.deliveryPrice}>{option.price}</div>
    </div>
  )
}

export const ShippingOptions: FC<ShippingOptionsProps> = ({ options }: ShippingOptionsProps) => (
  <div className={css.root}>
    {map(
      options,
      (({ companyId, type, ...option }) => (
        <ShippingOption
          key={companyId + type}
          companyId={companyId}
          type={type}
          {...option}
        />
      )),
    )}
  </div>
)
