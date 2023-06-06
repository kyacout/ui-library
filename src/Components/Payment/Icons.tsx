import map from 'lodash/map'
import React, { FC } from 'react'

import { PaymentIcon } from './Icon'
import css from './Icons.styl'

interface PaymentIconsProps {
  icons: string[]
}

export const PaymentIcons: FC<PaymentIconsProps> = (
  {
    icons,
  }: PaymentIconsProps,
) => (
  <div className={css.PaymentIcons}>
    {map(icons, icon => <PaymentIcon key={icon} icon={icon} />)}
  </div>
)
