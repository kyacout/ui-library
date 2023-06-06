import React, { FC, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

import BagIcon from '@Assets/SVG/Bag'
import HeartIcon from '@Assets/SVG/Heart'
import SearchIcon from '@Assets/SVG/Search'
import UserIcon from '@Assets/SVG/User'
import { Abundance } from '@Components/Badges/Abundance'
import {
  BurgerMenuIcon,
  IconWithLabel,
  IconWithLabelProps,
  SVGIcon,
} from '@Components/Icons'
import { Link } from '@Components/Link'
import { LoginModals } from '@Components/Login'
import { MobileMenu } from '@Components/MobileMenu'
import { handleEvent } from '@Events/Manager'
import { NavigationEvent } from '@Events/Navigation'
import { OtherEvent } from '@Events/Other'
import { MetadataContext } from '@Globals/Metadata'
import { Name } from '@Globals/Resource'
import { SearchContext } from '@Globals/Search/Context'
import { storeURL } from '@Globals/Store'
import { UserContext } from '@Globals/User'

import css from './index.styl'

const defaultState = {
  isMenuOpen: false,
  isSubMenuOpen: false,
  selectedCategoryName: null,
  useDelayOnClose: false,
}

const iconSmallTextBelowPhablet = (
  storeName: string,
): IconWithLabelProps['smallTextBelowPhablet'] => {
  switch (storeName) {
    case 'stores/15':
    case 'stores/24':
      return true
    default:
      return false
  }
}

const iconSmallTextBelowPhone = (
  storeName: string,
): IconWithLabelProps['smallTextBelowPhablet'] => {
  switch (storeName) {
    case 'stores/6':
    case 'stores/9':
      return true
    default:
      return false
  }
}

export const IconBar: FC = () => {
  const { t } = useTranslation()
  const { store } = useContext(MetadataContext)

  const { userData } = useContext(UserContext)
  const { setActive: setSearchActive } = useContext(SearchContext)

  const accountURL = storeURL('customer/account')
  const cartURL = storeURL('checkout/cart/')
  const wishListURL = storeURL('account/wishlist/')

  const [loginModalOpen, setLoginModalOpen] = useState(false)

  const [
    {
      isMenuOpen,
      isSubMenuOpen,
      selectedCategoryName,
      useDelayOnClose,
    },
    setState,
  ] = useState(defaultState)

  const openMobileMenu = () => {
    setState(prev => ({
      ...prev,
      isMenuOpen: !prev.isMenuOpen,
    }))
    handleEvent(new OtherEvent({
      attributes: {
        is_opened: true,
      },
      eventName: 'nav_mobile_menu_toggle',
    }))
  }

  const closeMobileMenu = () => {
    setState(prev => ({
      ...prev,
      isMenuOpen: false,
      isSubMenuOpen: false,
      useDelayOnClose: prev.isSubMenuOpen,
    }))
  }

  const onTopCategoryClick = (categoryName: string) => {
    setState(prev => ({
      ...prev,
      isSubMenuOpen: true,
      selectedCategoryName: categoryName,
    }))
    handleEvent(new OtherEvent({
      attributes: {
        category_id: new Name(categoryName).id,
        is_opened: true,
      },
      eventName: 'nav_mobile_menu_category_toggle',
    }))
  }

  const onCloseSubCategory = () => {
    setState(prev => ({
      ...prev,
      isSubMenuOpen: false,
    }))
  }

  return (
    <>
      {/* Icon bar */}
      <div className={css.IconBar}>
        {/* Menu */}
        <div className={css.Icon} onClick={openMobileMenu}>
          <IconWithLabel
            label={t('header:HEADER_MOBILE_MENU_LABEL')}
            smallTextBelowPhablet={iconSmallTextBelowPhablet(store?.name)}
            smallTextBelowPhone={iconSmallTextBelowPhone(store?.name)}
          >
            <div className={css.BurgerIconSpacing}><BurgerMenuIcon /></div>
          </IconWithLabel>
        </div>

        {/* Search */}
        <div className={css.Icon} onClick={() => setSearchActive(true)}>
          <IconWithLabel
            label={t('header:HEADER_MOBILE_SEARCH_LABEL')}
            smallTextBelowPhablet={iconSmallTextBelowPhablet(store?.name)}
            smallTextBelowPhone={iconSmallTextBelowPhone(store?.name)}
          >
            <SVGIcon icon={SearchIcon} />
          </IconWithLabel>
        </div>

        {/* User account */}
        {userData?.loggedIn && (
          <Link
            className={css.Icon}
            event={new NavigationEvent({
              attributes: {
                dest_page_type: 'customer-area',
                dest_page_type_id: '',
                source_id: 'header',
              },
              eventName: 'nav_link_click',
            })}
            href={accountURL}
          >
            <IconWithLabel
              label={t('header:MY_ACCOUNT_LABEL')}
              smallTextBelowPhablet={iconSmallTextBelowPhablet(store?.name)}
              smallTextBelowPhone={iconSmallTextBelowPhone(store?.name)}
            >
              <SVGIcon icon={UserIcon} />
            </IconWithLabel>
          </Link>
        )}
        {!userData?.loggedIn && (
          <div
            className={css.Icon}
            onClick={() => setLoginModalOpen(true)}
          >
            <IconWithLabel
              label={t('header:LOG_IN_LABEL')}
              smallTextBelowPhablet={iconSmallTextBelowPhablet(store?.name)}
              smallTextBelowPhone={iconSmallTextBelowPhone(store?.name)}
            >
              <SVGIcon icon={UserIcon} />
            </IconWithLabel>
          </div>
        )}

        {/* Wish list */}
        <Link
          className={css.Icon}
          event={new NavigationEvent({
            attributes: {
              dest_page_type: 'wish-list',
              dest_page_type_id: '',
              source_id: 'header',
            },
            eventName: 'nav_link_click',
          })}
          href={wishListURL}
        >
          <IconWithLabel
            label={t('header:WISH_LIST_LABEL')}
            smallTextBelowPhablet={iconSmallTextBelowPhablet(store?.name)}
            smallTextBelowPhone={iconSmallTextBelowPhone(store?.name)}
          >
            <Abundance count={userData?.wishList?.abundance}>
              <SVGIcon icon={HeartIcon} />
            </Abundance>
          </IconWithLabel>
        </Link>

        {/* Cart */}
        <Link
          className={css.Icon}
          event={new NavigationEvent({
            attributes: {
              dest_page_type: 'cart',
              dest_page_type_id: '',
              source_id: 'header',
            },
            eventName: 'nav_link_click',
          })}
          href={cartURL}
        >
          <IconWithLabel
            label={t('header:CART_SHORT_LABEL')}
            smallTextBelowPhablet={iconSmallTextBelowPhablet(store?.name)}
            smallTextBelowPhone={iconSmallTextBelowPhone(store?.name)}
          >
            <Abundance count={userData?.basket?.quantity}>
              <SVGIcon icon={BagIcon} />
            </Abundance>
          </IconWithLabel>
        </Link>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        closeMobileMenu={closeMobileMenu}
        isMenuOpen={isMenuOpen}
        isSubMenuOpen={isSubMenuOpen}
        onCloseSubCategory={onCloseSubCategory}
        onTopCategoryClick={onTopCategoryClick}
        selectedCategoryName={selectedCategoryName}
        useDelayOnClose={useDelayOnClose}
      />

      <LoginModals
        onHide={() => setLoginModalOpen(false)}
        show={loginModalOpen}
        sourceID="header"
      />
    </>
  )
}
