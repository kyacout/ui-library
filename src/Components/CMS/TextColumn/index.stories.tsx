import React from 'react'

import css from '@Components/CMS/index.styl'

import { TextColumn } from './index'

export default {
  component: TextColumn,
  title: 'CMS/TextColumn',
}

const text = `
  Landjaeger meatball filet mignon, tenderloin prosciutto venison beef ribs rump chicken. Turkey
  pork cupim spare ribs, chislic chuck sirloin pancetta shank hamburger picanha strip steak swine
  biltong pork chop. Chicken pork belly swine bresaola spare ribs prosciutto frankfurter t-bone pork
  andouille ham hock jowl ham turkey. Ham hock flank bacon turkey. Prosciutto salami shank beef pig
  corned beef fatback ground round leberkas pork belly chislic jowl turkey. Shankle ham meatball
  filet mignon pork belly strip steak. Jerky flank porchetta chislic bresaola ground round doner
  frankfurter landjaeger sirloin.
`

export const SingleColumn = () => (
  <div className={css.singlePostWrap}>
    <TextColumn text={text} />
  </div>
)

export const TwoColumns = () => (
  <div className={css.singlePostWrap}>
    <TextColumn text={text} variant="two-column" />
  </div>
)
