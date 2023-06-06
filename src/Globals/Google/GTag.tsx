/* eslint-disable react/no-danger */
import React, { FC } from 'react'

interface GTagScriptProps {
  measurementID: string
}

const gtagSetup = (measurementID: string) => `
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementID}');
`

// Used to load and setup gtag.js
export const GTagScript: FC<GTagScriptProps> = (
  {
    measurementID,
  }: GTagScriptProps,
) => (
  <>
    <script
      key="gtag-load"
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementID}`}
      type="text/javascript"
    />
    <script
      key="gtag-setup"
      dangerouslySetInnerHTML={{ __html: gtagSetup(measurementID) }}
      type="text/javascript"
    />
  </>
)
