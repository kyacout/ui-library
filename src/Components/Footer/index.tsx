import React from 'react'

import { Contact } from './Contact'
import { CopyrightAndPrivacy } from './CopyrightAndPrivacy'
import { CustomerSupport } from './CustomerSupport'
import css from './index.styl'
import { Newsletter } from './Newsletter'
import { Payment } from './Payment'
import { Story } from './Story'
import { TrustPilot } from './TrustPilot'

export const Footer = () => (
  <div className={css.FooterOuter}>
    <div className={css.FooterContainer}>
      <Payment />
      <Contact />
      <TrustPilot />
      <CustomerSupport />
      <Newsletter />
      <Story />
    </div>
    <CopyrightAndPrivacy />
  </div>
)
