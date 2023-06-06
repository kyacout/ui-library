import React from 'react'

import css from '@Components/CMS/index.styl'

import { Title } from './index'

export default {
  component: Title,
  title: 'CMS/Title',
}

export const H1 = () => (
  <div className={css.singlePostWrap}>
    <Title title="Test title" type="h1" />
  </div>
)

export const H1WithSubtitle = () => (
  <div className={css.singlePostWrap}>
    <Title subtitle="A subtitle" title="Test title" type="h1" />
  </div>
)

export const H2 = () => (
  <div className={css.singlePostWrap}>
    <Title title="Test title" type="h2" />
  </div>
)

export const H2WithSubtitle = () => (
  <div className={css.singlePostWrap}>
    <Title subtitle="A subtitle" title="Test title" type="h2" />
  </div>
)

export const H3 = () => (
  <div className={css.singlePostWrap}>
    <Title title="Test title" type="h3" />
  </div>
)
