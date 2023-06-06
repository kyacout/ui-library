import React, { useContext } from 'react'

import { PaymentIcons } from '@Components/Payment/Icons'
import { MetadataContext } from '@Globals/Metadata'

export default {
  component: PaymentIcons,
  title: 'Components/Payment',
}

export const Icons = () => (
  <PaymentIcons icons={[
    '4',
    '5',
    '7',
    'amax',
    'bcmc',
    'bcmc_mobile',
    'blik',
    'carta-si',
    'cartebancaire',
    'cdp_invoice',
    'directEbanking',
    'dotpay',
    'dotpay-real',
    'ebanking_FI',
    'giropay',
    'ideal',
    'interac',
    'interac-fr',
    'klarna',
    'klarna_account',
    'maestro',
    'mc',
    'multibanco',
    'paypal',
    'poli',
    'poste-pay',
    'postfinancecw_postfinancecard',
    'postfinancecw_postfinanceefinance',
    'postfinancecw_twint',
    'swish-horizontal',
    'trustly',
    'trustpay',
    'vipps',
    'visa',
    'visa-electron',
    'visadankort',
  ]}
  />
)

export const IconsFromMetadata = () => {
  const { paymentIcons } = useContext(MetadataContext)

  return <PaymentIcons icons={paymentIcons} />
}
