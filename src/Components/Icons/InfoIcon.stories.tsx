import React from 'react'

import { InfoIcon } from '@Components/Icons'

export default {
  component: InfoIcon,
  title: 'InfoIcon',
}

export const InfoIconDefault = () => <InfoIcon />

InfoIconDefault.story = {
  name: 'InfoIcon',
}

export const InfoIconSize = () => <InfoIcon size="40px" />

InfoIconSize.story = {
  name: 'InfoIconSize',
}
