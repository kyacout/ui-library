/* eslint-disable react/no-danger */
import getConfig from 'next/config'
import React from 'react'

const { publicRuntimeConfig } = getConfig()

const gtmFallback = `
<iframe src="https://www.googletagmanager.com/ns.html?id=${publicRuntimeConfig.googleTagManagerKey}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
`

export const gtmInit = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${publicRuntimeConfig.googleTagManagerKey}');
`

// Used as a fallback when javascript is disabled
export const GTMNoScript = () => (
  <noscript
    key="gtm-no-script"
    dangerouslySetInnerHTML={{ __html: gtmFallback }}
  />
)
