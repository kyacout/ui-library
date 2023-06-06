import React from 'react'

import { PaymentIcon } from '@Components/Payment/Icon'

export default {
  component: PaymentIcon,
  title: 'Components/Payment',
}

export const IconVisa = () => <PaymentIcon icon="visa" />

export const IconPaypal = () => <PaymentIcon icon="paypal" />
