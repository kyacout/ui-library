import React, { FC } from 'react'

import { svgURL } from '@Globals/Cloudinary'

interface YOLOFlagIconProps {
  country: string
}

export const YOLOFlagIcon: FC<YOLOFlagIconProps> = ({ country }: YOLOFlagIconProps) => (
  <img
    alt=""
    src={svgURL(`frontend/country-flags/flag-${country}.svg`)}
  />
)
