import React from 'react'

import SearchIcon from '@Assets/SVG/Search'
import { SVGIcon } from '@Components/Icons'

import css from './Search.styl'

export const SearchAdornment = (props: JSX.IntrinsicElements['button']) => (
  <button
    {...props}
    className={css.root}
    type="submit"
  >
    <SVGIcon icon={SearchIcon} size="100%" />
  </button>
)
