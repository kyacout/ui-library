import React from 'react'

import { TextArea } from './TextArea'

export default {
  component: TextArea,
  title: 'Form Elements/TextArea',
}

export const Default = () => <TextArea label="What is your favorite movie?" />

export const withError = () => (
  <TextArea error="What is your favorite movie?" label="What is your favorite movie?" />
)

export const withNoAnimationLabel = () => (
  <TextArea
    label="What is your favorite movie?"
    withoutLabelAnimation
  />
)
