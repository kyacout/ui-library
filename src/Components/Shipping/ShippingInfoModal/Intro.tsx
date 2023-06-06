import React, { useContext } from 'react'

import { MetadataContext } from '@Globals/Metadata'
import { formatMoney } from '@Globals/Money'
import { Experiment } from '@Globals/SplitTests/Experiment'
import { useTranslation } from '@Globals/Translations'

import css from './Intro.styl'

export const ShippingIntro = () => {
  const { t, tDanger } = useTranslation()
  const { store } = useContext(MetadataContext)

  const freeShippingThreshold = store?.config?.freeShippingThreshold || false

  return (
    <div className={css.root}>
      {freeShippingThreshold && (
        <span
          {...tDanger(
            'header:DELIVERY_INFO_INTRO_TEXT_WITH_THRESHOLD',
            {
              arg1: formatMoney(
                store?.name,
                store?.config?.localeCode,
                freeShippingThreshold,
              ),
            },
          )}
        />
      )}
      {!freeShippingThreshold && (
        <span>{t('header:DELIVERY_INFO_INTRO_TEXT')}</span>
      )}

      {/* Text for Canada */}
      {store?.config?.countryCode === 'CA' && (
        <Experiment
          A={(
            <span>{t('header:WE_ARE_SENDING_FROM_EUROPE_IMPORT_INFO_TEXT')}</span>
          )}
          B={(
            <span>{`${t('header:ALL_DUTIES_AND_TAXES_INCLUDED')}.`}</span>
          )}
          test="ca_duties_v1"
        />
      )}
    </div>
  )
}
