import clsx from 'clsx'
import React, { FC, useContext, useState } from 'react'

import { InfoIcon, YOLOFlagIcon } from '@Components/Icons'
import { ShippingInfoModal } from '@Components/Shipping/ShippingInfoModal'
import { MetadataContext } from '@Globals/Metadata'
import { formatMoney } from '@Globals/Money'
import { useTranslation } from '@Globals/Translations'
import { UserContext } from '@Globals/User'

import css from './index.styl'

export interface USPBarProps {
  evenSpacingOnSmallDesktop?: boolean
  smallTextBelowPhablet?: boolean,
  smallTextBelowPhone?: boolean,
  smallTextOnSmallDesktop?: boolean
  useText?: boolean
}

export const USPBar: FC<USPBarProps> = (
  {
    evenSpacingOnSmallDesktop = false,
    smallTextBelowPhablet = false,
    smallTextBelowPhone = false,
    smallTextOnSmallDesktop = false,
    useText = false,
  }: USPBarProps,
) => {
  const { t, tDanger } = useTranslation()
  const { store } = useContext(MetadataContext)
  const { userData } = useContext(UserContext)
  const YOLOCountry = userData?.otherCountry?.country || ''
  const phone = store?.config?.phone
  const cheapestShippingPrice = store?.config?.cheapestShippingPrice || false
  const freeShippingThreshold = store?.config?.freeShippingThreshold || false
  const [shippingInfoModalOpen, setShippingInfoModalOpen] = useState(false)

  return (
    <>
      <div className={clsx(
        css.root,
        evenSpacingOnSmallDesktop && css.evenSpacingOnSmallDesktop,
        smallTextOnSmallDesktop && css.smallTextOnSmallDesktop,
        (!useText && smallTextBelowPhablet) && css.smallTextBelowPhabletA,
        (!useText && smallTextBelowPhone) && css.smallTextBelowPhoneA,
        (useText && smallTextBelowPhablet) && css.smallTextBelowPhabletB,
        !useText && css.withIcon,
      )}
      >
        <div className={css.inner}>
          {/* Returns */}
          <div className={clsx(
            css.item,
            css.firstItem,
          )}
          >
            <span {...tDanger('header:DESKTOP_HEADER_USP_365_DAY_RETURN')} />
          </div>

          {/* Delivery */}
          <div className={clsx(
            css.item,
            css.middleItem,
          )}
          >
            {YOLOCountry && (
              <div className={css.countryFlag}>
                <YOLOFlagIcon country={YOLOCountry} />
              </div>
            )}

            {/* - Check for shipping threshold  */}
            {cheapestShippingPrice && freeShippingThreshold ? (
              <span>
                {t('header:SHIPPING_X_FREE_OVER_X', {
                  arg1: formatMoney(
                    store?.name,
                    store?.config?.localeCode,
                    cheapestShippingPrice,
                  ),
                  arg2: formatMoney(
                    store?.name,
                    store?.config?.localeCode,
                    freeShippingThreshold,
                  ),
                })}
              </span>
            ) : (
              <span {...tDanger('header:DESKTOP_HEADER_USP_FREE_DELIVERY')} />
            )}

            {useText && (
              <span className={css.seeOptions}>
                -
                <span onClick={() => setShippingInfoModalOpen(true)}>
                  {t('header:SEE_OPTIONS')}
                </span>
              </span>
            )}

            {!useText && (
              <div onClick={() => setShippingInfoModalOpen(true)}>
                <InfoIcon />
              </div>
            )}
          </div>

          {/* Contact */}
          <div className={[css.item, css.lastItem].join(' ')}>
            <span>
              {phone && (
                <a href={`tel:${phone.replace(' ', '')}`}>
                  {phone}
                  {' - '}
                </a>
              )}
              (
              {t('header:PHONE_OPEN_HOURS').toLowerCase()}
              )
            </span>
          </div>
        </div>
      </div>

      <ShippingInfoModal
        onHide={() => setShippingInfoModalOpen(false)}
        show={shippingInfoModalOpen}
        sourceID="header"
      />
    </>
  )
}
