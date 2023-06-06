// @ts-ignore

const { readFileSync } = require('fs')
const path = require('path')
const { JsConfigPathsPlugin } = require('next/dist/build/webpack/plugins/jsconfig-paths-plugin')

function parseJsonFile(path: string) {
  const JSON5 = require('next/dist/compiled/json5')
  const contents = readFileSync(path)
  return JSON5.parse(contents)
}

const tsConfigRoot = parseJsonFile(path.resolve(__dirname, '..', 'tsconfig.json'))

module.exports = {
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-toolbars',
  ],
  stories: [
    '../src/**/*.stories.tsx',
  ],
  webpackFinal: async (config) => {
    const nextConfig = require('../next.config')

    // Handle stylus files like in our next webpack customization
    config.module.rules.push({
      test: /\.styl$/,
      loaders: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
        {
          loader: 'stylus-loader',
          options: nextConfig.stylusLoaderOptions,
        },
      ],
    })

    config.resolve.plugins = [
      new JsConfigPathsPlugin(
        tsConfigRoot?.compilerOptions?.paths,
        path.resolve(__dirname, '..', tsConfigRoot?.compilerOptions?.baseUrl || '.'),
      ),
    ]

    config.resolve.alias['next/config'] = path.resolve(
      __dirname,
      './mocks/next-config.js',
    )

    // TODO: remove after upgrading storybook + core-js
    // See: https://github.com/storybookjs/storybook/issues/6204#issuecomment-478992364
    config.resolve.alias['core-js/modules'] = path.resolve(
      __dirname,
      '../node_modules/@storybook/core/node_modules/core-js/modules',
    )

    config.resolve.alias['@sentry/node'] = '@sentry/browser'

    return config
  }
}
