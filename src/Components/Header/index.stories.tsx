import React from 'react'

import { Header } from '@Components/Header'

export default {
  component: Header,
  title: 'Header',
}

export const HeaderDefault = () => <Header />

HeaderDefault.story = {
  name: 'Header',
}
