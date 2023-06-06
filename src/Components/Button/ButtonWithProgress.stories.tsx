import React from 'react'

import { ButtonWithProgress } from '@Components/Button/ButtonWithProgress'

import { Button } from './index'

export default {
  component: Button,
  title: 'Components/ButtonWithProgress',
}

export const MediumDark = () => (
  <>
    <ButtonWithProgress color="dark" loading>
      Primary button loading
    </ButtonWithProgress>
    <ButtonWithProgress color="dark" loading variant="outlined">
      Primary Outlined
    </ButtonWithProgress>
  </>
)

export const MediumPrimary = () => (
  <>
    <ButtonWithProgress loading>
      Primary button loading
    </ButtonWithProgress>
    <ButtonWithProgress loading variant="outlined">
      Primary Outlined
    </ButtonWithProgress>
  </>
)

export const MediumWhite = () => (
  <>
    <ButtonWithProgress color="white" loading>
      Primary button loading
    </ButtonWithProgress>
  </>
)

export const SmallPrimary = () => (
  <>
    <ButtonWithProgress loading size="small">
      Primary button loading
    </ButtonWithProgress>
    <ButtonWithProgress loading size="small" variant="outlined">
      Primary Outlined
    </ButtonWithProgress>
  </>
)

export const SmallDark = () => (
  <>
    <ButtonWithProgress color="dark" loading size="small">
      Primary button loading
    </ButtonWithProgress>
    <ButtonWithProgress color="dark" loading size="small" variant="outlined">
      Primary Outlined
    </ButtonWithProgress>
  </>
)
