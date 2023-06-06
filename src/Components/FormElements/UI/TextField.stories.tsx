import React from 'react'

import { TextField } from './TextField'

export default {
  component: TextField,
  title: 'Form Elements/TextField',
}

export const Medium = () => <TextField label="Full name" />

export const MediumWithError = () => (
  <TextField error="Please enter a valid name" label="Full name" />
)

export const MediumWithNoLabelAnimation = () => (
  <TextField label="Full name" withoutLabelAnimation />
)

export const withoutAnimation = () => <TextField animateLabel={false} label="Fullname" />
