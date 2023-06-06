import { StoryContext, StoryGetter, StoryWrapper } from '@storybook/addons'
import noop from 'lodash/noop'
import React from 'react'

import { CMSData, MetadataProvider } from '@Globals/Metadata'
import { Category } from '@Protos/catalog/catalog_pb'
import { Store, StoreConfig } from '@Protos/stores/stores_pb'

const store = new Store()
store.setName('stores/8')

const storeConfig = new StoreConfig()
storeConfig.setUrlFull('https://www.example.com')
store.setConfig(storeConfig)

const category = new Category()
category.setName('categories/1')
category.setStoreName(store.getName())
category.setIncludeInMenu(true)
category.setTitle('Some category')

const cmsData: CMSData = {
  latestArticles: [
    {
      name: 'posts/352',
      storeName: 'stores/8',
      url: 'https://www.example.com/articles/352/tell-your-story-podcast',
      title: 'Tell Your Story Podcast ',
      content: '',
      preview: 'Because every man has a story worth telling ',
      imageUrl: '/media/cms/352/Hero-no-border',
      brandName: 'brands/',
    },
    {
      name: 'posts/349',
      storeName: 'stores/8',
      url: 'https://www.example.com/articles/349/what-does-it-take-to-design-bold',
      title: 'What Does it Take to Design Bold? ',
      content: '',
      preview: 'See how we bring a bold Viking vibe into our latest jewellery collection for Moody Mason. ',
      imageUrl: '/media/cms/349/Image-page-new',
      brandName: 'brands/',
    },
    {
      name: 'posts/348',
      storeName: 'stores/8',
      url: 'https://www.example.com/articles/348/behind-the-design-details-that-matter',
      title: 'Behind the Design: Details that Matter',
      content: '',
      preview: 'From design sketch and digital drawings to finished products – this is how we add intricate details to each Arkai pendant necklace and bracelet we create. ',
      imageUrl: '/media/cms/348/Image-page',
      brandName: 'brands/',
    },
  ],
  latestCollections: [
    {
      name: 'posts/347',
      storeName: 'stores/8',
      url: 'https://www.example.com/collections/347/waykins-foldable-sunglasses-31-new-styles',
      title: 'Waykins Foldable Sunglasses + 31 New Styles',
      content: '',
      preview: 'From folding sunglasses to scratch-resistant lenses, our latest sunglasses are made to look beyond and see things clearer. ',
      imageUrl: '/media/cms/347/thumb',
      brandName: 'brands/670',
    },
    {
      name: 'posts/317',
      storeName: 'stores/8',
      url: 'https://www.example.com/collections/317/soft-itch-free-scarves-beanies',
      title: 'Soft, itch-free scarves & beanies',
      content: '',
      preview: 'With breathable, heat-trapping warmth, each scarf and beanie in The Montagna Collection is thoughtfully designed for the coldest of days.',
      imageUrl: '/media/cms/317/main-2.jpg',
      brandName: 'brands/669',
    },
    {
      name: 'posts/294',
      storeName: 'stores/8',
      url: 'https://www.example.com/collections/294/watches-with-a-visible-heartbeat',
      title: 'Watches With A Visible Heartbeat',
      content: '',
      preview: 'The Dante watches are powered by your movement. As long as you\'re moving, the watch will too. Don\'t stop moving.',
      imageUrl: '/media/cms/294/dante_main.jpg',
      brandName: 'brands/703',
    },
  ],
  urls: {
    aboutUs: 'https://www.example.com/articles/209/about-us',
    cookiePolicy: 'https://www.example.com/terms/310/cookie-policy',
    privacyPolicy: 'https://www.example.com/terms/309/personal-data-protection-policy-treatment-of-your-data',
    terms: 'https://www.example.com/terms/136/uiLibrary-terms-of-service'
  }
}

export const withMetadataProvider: StoryWrapper = (Story: StoryGetter, context: StoryContext) => (
  <MetadataProvider
    addSurrogateKey={noop}
    availableLocales={[]}
    categories={[category.toObject()]}
    cmsData={cmsData}
    paymentIcons={['visa', 'mc', 'paypal']}
    store={store.toObject()}
  >
    <Story {...context} />
  </MetadataProvider>
)
