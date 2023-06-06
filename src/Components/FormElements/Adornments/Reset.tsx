import React from 'react'

import CloseIcon from '@Assets/SVG/Close'
import { SVGIcon } from '@Components/Icons'

import css from './Reset.styl'

export const ResetAdornment = (props: JSX.IntrinsicElements['button']) => (
  <button
    {...props}
    className={css.ResetButton}
    type="button"
  >
    <SVGIcon icon={CloseIcon} size="100%" />
  </button>
)
