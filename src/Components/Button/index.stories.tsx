import React from 'react'

import { Button } from './index'

export default {
  component: Button,
  title: 'Components/Button',
}

export const MediumDark = () => (
  <>
    <Button color="dark">
      Dark Full
    </Button>
    <Button color="dark" disabled>
      Dark Full Disabled
    </Button>
    <Button color="dark" variant="outlined">
      Dark Outlined
    </Button>
  </>
)

export const MediumPrimary = () => (
  <>
    <Button>
      Primary Full
    </Button>
    <Button disabled>
      Primary Full Disabled
    </Button>
    <Button variant="outlined">
      Primary Outlined
    </Button>
  </>
)
export const MediumWhite = () => (
  <>
    <Button color="white">
      White Full
    </Button>
    <Button color="white" disabled>
      White Full Disabled
    </Button>
  </>
)

export const SmallPrimary = () => (
  <>
    <Button size="small">
      Primary Full
    </Button>
    <Button size="small" variant="outlined">
      Primary Outlined
    </Button>
    <Button disabled size="small">
      Primary Full Disabled
    </Button>
  </>
)

export const SmallDark = () => (
  <>
    <Button color="dark" size="small">
      Primary Full
    </Button>
    <Button color="dark" size="small" variant="outlined">
      Primary Outlined
    </Button>
    <Button color="dark" disabled size="small">
      Primary Full Disabled
    </Button>
  </>
)
