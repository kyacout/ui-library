import React from 'react'
import { StoryContext, StoryGetter, StoryWrapper } from '@storybook/addons'
import { SearchProvider } from '@Globals/Search/Context'

export const withSearchProvider: StoryWrapper = (Story: StoryGetter, context: StoryContext) => (
  <SearchProvider>
    <Story {...context} />
  </SearchProvider>
)
