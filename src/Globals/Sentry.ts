import * as Sentry from '@sentry/node'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

Sentry.init({
  dsn: publicRuntimeConfig.sentryDSN,
  enabled: process.env.NODE_ENV === 'production',
})

export default Sentry
