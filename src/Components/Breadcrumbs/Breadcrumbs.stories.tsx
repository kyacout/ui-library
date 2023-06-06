import React from 'react'

import { Breadcrumbs } from '.'

export default {
  component: Breadcrumbs,
  title: 'Breadcrumbs',
}

export const withSingleItem = () => (
  <Breadcrumbs>
    <a href="/">uiLibrary</a>
  </Breadcrumbs>
)

export const withTwoItems = () => (
  <Breadcrumbs>
    <a href="/">uiLibrary</a>
    <a href="/child1">Child 1</a>
  </Breadcrumbs>
)

export const withThreeItems = () => (
  <Breadcrumbs>
    <a href="/">uiLibrary</a>
    <a href="/child1">Child 1</a>
    <a href="/child1/child2">Child 2</a>
  </Breadcrumbs>
)
