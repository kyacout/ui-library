const dotenv = require('dotenv')
const forEach = require('lodash/forEach')
const has = require('lodash/has')
const set = require('lodash/set')
const path = require('path')

// Setup environment variables
// Load from /config/.env
dotenv.config({ path: '/config/.env' })
// Load from .env
dotenv.config()

// Analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// Sentry
const SentryWebpackPlugin = require('@sentry/webpack-plugin')

const {
  NODE_ENV,
  SENTRY_AUTH_TOKEN,
  SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
} = process.env

// Source Maps
const nextSourceMaps = require('@zeit/next-source-maps')()

// Stylus
const withStylus = require('@zeit/next-stylus')
const poststylus = require('poststylus')
const autoprefixer = require('autoprefixer')

const stylusPrereqs = path.resolve(__dirname, 'src', 'Globals', 'Stylus', '_prereqs')

// Config
const nextConfig = {
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
  },
  cssModules: true,
  env: {
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    API_ENDPOINT: process.env.API_ENDPOINT,
    GOOGLE_TAG_MANAGER_KEY: process.env.GOOGLE_TAG_MANAGER_KEY,
    MPARTICLE_API_KEY: process.env.MPARTICLE_API_KEY,
    MPARTICLE_IS_DEV: process.env.MPARTICLE_IS_DEV,
    REDIRECT_ENDPOINT: process.env.REDIRECT_ENDPOINT,
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
  experimental: {
    jsconfigPaths: true,
  },
  poweredByHeader: false,
  publicRuntimeConfig: {
    algoliaAPIKey: process.env.ALGOLIA_API_KEY,
    algoliaAppID: process.env.ALGOLIA_APP_ID,
    apiEndpoint: process.env.API_ENDPOINT,
    googleTagManagerKey: process.env.GOOGLE_TAG_MANAGER_KEY,
    mParticleAPIKey: process.env.MPARTICLE_API_KEY,
    mParticleIsDev: process.env.MPARTICLE_IS_DEV,
    redirectEndpoint: process.env.REDIRECT_ENDPOINT,
    sentryDSN: process.env.SENTRY_DSN,
  },
  rewrites: async () => ([
    {
      destination: '/:any*',
      source: '/:lang([a-z]{2})/:any*',
    },
  ]),
  stylusLoaderOptions: {
    import: [
      path.resolve(__dirname, 'node_modules', 'rupture', 'rupture', 'index.styl'),
      path.join(stylusPrereqs, '1_break-points.styl'),
      path.join(stylusPrereqs, '2_vars.styl'),
      path.join(stylusPrereqs, '3_transitions.styl'),
      path.join(stylusPrereqs, 'mixins-*.styl'),
    ],
    preferPathResolver: 'webpack',
    use: [
      poststylus([
        autoprefixer(),
      ]),
    ],
  },
  webpack: (config, options) => {
    /* eslint-disable no-param-reassign */
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }

    if (SENTRY_DSN
      && SENTRY_ORG
      && SENTRY_PROJECT
      && SENTRY_AUTH_TOKEN
      && NODE_ENV === 'production'
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          ignore: ['node_modules'],
          include: '.next',
          release: options.buildId,
          urlPrefix: '~/_next',
        }),
      )
    }

    // Remove console.* from production builds
    if (!options.isServer && !options.dev) {
      forEach(
        config.optimization.minimizer || [],
        (minimizer) => {
          if (!has(minimizer, 'options.terserOptions')) {
            return
          }

          set(minimizer, 'options.terserOptions.compress.drop_console', true)
        },
      )
    }

    return config
  },
}

module.exports = nextSourceMaps(withBundleAnalyzer(withStylus(nextConfig)))
