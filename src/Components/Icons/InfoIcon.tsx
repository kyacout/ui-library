import React, { FC } from 'react'

import css from './InfoIcon.styl'

interface InfoIconProps {
  size?: string
}

export const InfoIcon: FC<InfoIconProps> = (
  {
    size = '30px',
  }: InfoIconProps,
) => (
  <div className={css.InfoIcon} style={{ height: size, width: size }}>
    <span className={css.InfoIconSpan}>i</span>
  </div>
)
