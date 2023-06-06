import React, { useContext } from 'react'

import { PaymentIcons } from '@Components/Payment/Icons'
import { MetadataContext } from '@Globals/Metadata'
import { useTranslation } from '@Globals/Translations'

import css from './index.styl'

export const Payment = () => {
  const { paymentIcons } = useContext(MetadataContext)
  const { t } = useTranslation()

  return (
    <div className={`${css.Element} ${css.Payment} ${css.Top}`}>
      <div className={css.SectionTitle}>
        {t('footer:PAYMENT_OPTIONS')}
      </div>
      <p className={css.Text}>
        {t('footer:PAYMENT_OPTIONS_FOOTER_TEXT')}
      </p>
      <PaymentIcons icons={paymentIcons} />
    </div>
  )
}
