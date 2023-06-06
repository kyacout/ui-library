/* eslint-disable react/no-danger */
import forEach from 'lodash/forEach'
import noop from 'lodash/noop'
import React, { useContext, useEffect } from 'react'
import Cookies from 'universal-cookie'

import { MetadataContext } from '@Globals/Metadata'

const gaInit = `
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
`

const ga = (...args: any) => {
  const func = (window as any).ga || noop

  return func(...args)
}

export const AnalyticsScript = () => (
  <script
    key="analytics-init"
    dangerouslySetInnerHTML={{ __html: gaInit }}
    type="text/javascript"
  />
)

const environments = ['master', 'masterTwo', 'local']

export const SetupGA = () => {
  const { store } = useContext(MetadataContext)

  useEffect(() => {
    const clientId = new Cookies().get('th_uid')

    ga(
      'create',
      'UA-54197020-1',
      {
        allowLinker: true,
        clientId,
        cookieUpdate: false,
        name: 'master',
        storage: 'none',
      },
    )
    ga('master.require', 'displayfeatures')
    ga('master.require', 'ec')
    ga('master.require', 'linker')
    ga('master.linker:autoLink', ['live.adyen.com'])

    ga(
      'create',
      'UA-154432746-1',
      {
        allowLinker: true,
        clientId,
        cookieUpdate: false,
        name: 'masterTwo',
        storage: 'none',
      },
    )
    ga('masterTwo.require', 'displayfeatures')
    ga('masterTwo.require', 'ec')
    ga('masterTwo.require', 'linker')
    ga('masterTwo.linker:autoLink', ['live.adyen.com'])

    ga(
      'create',
      store?.config?.analyticsTrackingId,
      {
        clientId,
        cookieUpdate: false,
        name: 'local',
        siteSpeedSampleRate: 1,
        storage: 'none',
      },
    )
    ga('local.require', 'displayfeatures')
    ga('local.require', 'ec')
  }, [])

  return null
}

export const PageViewGA = () => {
  useEffect(() => {
    forEach(environments, environment => ga(`${environment}.send`, 'pageview'))
  }, [])

  return null
}
