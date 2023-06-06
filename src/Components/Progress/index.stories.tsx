import React from 'react'

import { Progress } from './index'

export default {
  component: Progress,
  title: 'Components/Progress',
}

export const Small = () => <Progress />

export const ExtraSmall = () => <Progress size="x-small" />

