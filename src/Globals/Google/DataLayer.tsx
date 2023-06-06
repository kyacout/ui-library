/* eslint-disable react/no-danger */
import Head from 'next/head'
import React, { FC } from 'react'

import { gtmInit } from './GTM'

type DataLayerInput = Record<string, any>

interface DataLayerProps {
  input: DataLayerInput
}

// Needed on its own to ensure google's tag assistant tracks it properly
export const DataLayerInit = () => (
  <script
    key="datalayer-head"
    dangerouslySetInnerHTML={{ __html: 'dataLayer = [];' }}
    type="text/javascript"
  />
)

// Used to push input to window.dataLayer
// Also ensures tag manager is initialized after first defining window.dataLayer
// Must be called outside of next/head
export const DataLayer: FC<DataLayerProps> = (
  {
    input,
  }: DataLayerProps,
) => (
  <Head>
    <script
      dangerouslySetInnerHTML={{ __html: `dataLayer.push(${JSON.stringify(input)});` }}
      type="text/javascript"
    />
    <script
      key="gtm-init"
      dangerouslySetInnerHTML={{ __html: gtmInit }}
      type="text/javascript"
    />
  </Head>
)
