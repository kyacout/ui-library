import { StoryContext, StoryGetter, StoryWrapper } from '@storybook/addons'
import React from 'react'

import { Basket, UserContext, UserData, WishList } from '@Globals/User'

const getBasket = (basketArg: string): Basket => {
  if (basketArg === 'empty') {
    return {
      quantity: 0,
    }
  }

  if (basketArg === 'full') {
    return {
      quantity: 5,
    }
  }

  return null
}

const getWishList = (basketArg: string): WishList => {
  if (basketArg === 'empty') {
    return {
      abundance: 0,
      productIDs: [],
    }
  }

  if (basketArg === 'full') {
    return {
      abundance: 2,
      productIDs: [1, 2],
    }
  }

  return null
}

const getUserData = (
  basketArg: string,
  userArg: string,
  wishListArg: string,
): UserData => {
  const basket = getBasket(basketArg)
  const wishList = getWishList(wishListArg)

  if (userArg === 'logged-in') {
    return {
      basket,
      geoIPCountryCode: 'DK',
      loggedIn: true,
      otherCountry: null,
      quoteID: '1',
      wishList,
    }
  }

  if (userArg === 'logged-out') {
    return {
      basket,
      geoIPCountryCode: 'DK',
      loggedIn: false,
      otherCountry: null,
      quoteID: '1',
      wishList,
    }
  }

  return null
}

export const withUserProvider: StoryWrapper = (Story: StoryGetter, context: StoryContext) => {
  const userData = getUserData(
    context.globals.basket,
    context.globals.user,
    context.globals.wishList,
  )

  return (
    <UserContext.Provider
      value={{
        loading: false,
        login: async () => false,
        logout: async () => false,
        revalidate: async () => false,
        userData,
      }}
    >
      <Story {...context} />
    </UserContext.Provider>
  )
}

export const globalTypes = {
  basket: {
    name: 'Basket',
    description: 'Basket contents',
    defaultValue: 'full',
    toolbar: {
      icon: 'basket',
      items: [
        'empty',
        'full',
      ],
    }
  },
  user: {
    name: 'User',
    description: 'User provider',
    defaultValue: 'logged-in',
    toolbar: {
      icon: 'users',
      items: [
        'logged-in',
        'logged-out',
      ],
    }
  },
  wishList: {
    name: 'Wishlist',
    description: 'Wishlist contents',
    defaultValue: 'full',
    toolbar: {
      icon: 'heart',
      items: [
        'empty',
        'full',
      ],
    }
  },
}
