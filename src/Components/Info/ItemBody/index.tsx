/* eslint-disable react/no-danger */
import React, { FC } from 'react'

import css from './index.styl'

interface ItemBodyProps {
  content: string
}

export const ItemBody: FC<ItemBodyProps> = ({ content }: ItemBodyProps) => (
  <div className={css.root} dangerouslySetInnerHTML={{ __html: content }} />
)
