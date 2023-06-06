import React from 'react'

import { TwoColumn } from './index'

export default {
  component: TwoColumn,
  title: 'Layouts/TwoColumn',
}

export const basic = () => <TwoColumn />

basic.story = {
  name: 'Basic',
}
