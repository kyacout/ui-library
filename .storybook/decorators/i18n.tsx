import { StoryContext, StoryGetter, StoryWrapper } from '@storybook/addons'
import i18n from 'i18next'
import XHRBackend from 'i18next-xhr-backend'
import React from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'

i18n
  .use(XHRBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/static/locales/{{lng}}/{{ns}}.json',
    },
    debug: true,
    defaultNS: 'common',
    fallbackLng: 'en-GB',
    lng: 'en-GB',
    ns: [
      'common',
      'contact',
      'footer',
      'header',
      'sidebar',
    ],
    react: {
      useSuspense: false,
    },
  })

export const withI18nextProvider: StoryWrapper = (Story: StoryGetter, context: StoryContext) => (
  <I18nextProvider i18n={i18n}>
    <Story {...context} />
  </I18nextProvider>
)
