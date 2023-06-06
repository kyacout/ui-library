/* eslint-disable react/no-danger */
import React from 'react'

const init = `
(function(h,o,t,j,a,r){
  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
  h._hjSettings={hjid:70023,hjsv:5};
  a=o.getElementsByTagName('head')[0];
  r=o.createElement('script');r.async=1;
  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
  r.crossOrigin="anonymous";
  a.appendChild(r);
})(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
`

export const HotJarScript = () => {
  if (process.env.NODE_ENV === 'development') {
    return null
  }

  return (
    <script
      key="hotjar-init"
      dangerouslySetInnerHTML={{ __html: init }}
      type="text/javascript"
    />
  )
}
