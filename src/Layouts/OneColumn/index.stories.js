import React from 'react'

import { OneColumn } from './index'

export default {
  component: OneColumn,
  title: 'Layouts/OneColumn',
}

export const basic = () => <OneColumn />

basic.story = {
  name: 'Basic',
}
