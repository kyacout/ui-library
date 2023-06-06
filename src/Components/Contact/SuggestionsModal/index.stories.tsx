import noop from 'lodash/noop'
import React from 'react'

import { SuggestionsModal } from '.'

export default {
  component: SuggestionsModal,
  title: 'Components/Contact/SuggestionsModal',
}

export const Default = () => (
  <SuggestionsModal
    onHide={noop}
    show
    submit={noop}
    suggestionsList={[
      {
        href: '/',
        id: '1',
        text: 'How do i find my hat size?',
      },
      {
        href: '/',
        id: '2',
        text: 'My product broke, what do i do?',
      },
      {
        href: '/',
        id: '3',
        text: 'When will i receive my money back?',
      },
      {
        href: '/',
        id: '4',
        text: 'How do i find my bracelet size?',
      },
    ]}
  />
)
