import clsx from 'clsx'
import includes from 'lodash/includes'
import React, { FC } from 'react'

import { svgURL } from '@Globals/Cloudinary'

import css from './Icon.styl'

interface PaymentIconProps {
  icon: string
}

const withBorders = ['maestro', 'mc']
const asWider = [
  '4',
  '5',
  'mobilepay',
  'multibanco',
  'paypal',
  'postfinancecw_postfinancecard',
  'postfinancecw_postfinanceefinance',
  'swish-horizontal',
]

export const PaymentIcon: FC<PaymentIconProps> = (
  {
    icon,
  }: PaymentIconProps,
) => (
  <div
    className={clsx(
      css.root,
      includes(withBorders, icon) && css.withBorder,
      includes(asWider, icon) && css.wide,
    )}
    style={{ backgroundImage: `url(${svgURL(`frontend/payment-icons/${icon}.svg`)})` }}
  />
)
