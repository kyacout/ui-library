import find from 'lodash/find'
import first from 'lodash/first'
import map from 'lodash/map'
import React, { FC, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import CloseIcon from '@Assets/SVG/Close'
import PhoneIcon from '@Assets/SVG/Phone'
import { SVGIcon } from '@Components/Icons'
import { Link } from '@Components/Link'
import { SidePane } from '@Components/SidePane'
import { NavigationEvent } from '@Events/Navigation'
import { MetadataContext } from '@Globals/Metadata'
import { Name } from '@Globals/Resource'
import { useCustomerSupportData } from '@Globals/useCustomerSupportData'

import { CategoryItem } from './CategoryItem'
import { CMSPosts } from './CMSPosts'
import { CustomerSupportMenu } from './CustomerSupportMenu'
import { Footer } from './Footer'
import css from './index.styl'
import { LanguageToggle } from './LanguageToggle'
import { SubCategoryMenu } from './SubCategoryMenu'

interface MobileMenuProps {
  closeMobileMenu: () => void
  isMenuOpen: boolean
  isSubMenuOpen: boolean
  onCloseSubCategory: () => void
  onTopCategoryClick: (name: string) => void
  selectedCategoryName?: string
  useDelayOnClose: boolean
}

export const MobileMenu: FC<MobileMenuProps> = (
  {
    closeMobileMenu,
    isMenuOpen,
    isSubMenuOpen,
    onCloseSubCategory,
    onTopCategoryClick,
    selectedCategoryName,
    useDelayOnClose,
  }: MobileMenuProps,
) => {
  const { t } = useTranslation()
  const { categories, categoriesMenu, store } = useContext(MetadataContext)
  const urlFull = store?.config?.urlFull || '/'
  const outletCategory = useMemo(() => find(categories, ['name', 'categories/224']), [categories])
  const selectedCategory = useMemo(() => {
    const item = find(
      categoriesMenu,
      ['name', selectedCategoryName],
    )

    if (item) {
      return item
    }

    return first(categoriesMenu)
  }, [selectedCategoryName, categoriesMenu])
  const customerSupportData = useCustomerSupportData()
  const phone = store?.config?.phone

  return (
    <>
      {/* Mobile menu */}
      <SidePane isShowing={isMenuOpen} onClose={closeMobileMenu} useDelayOnClose={useDelayOnClose}>
        {/* Close icon */}
        <div className={css.CloseIcon} onClick={closeMobileMenu}>
          <SVGIcon icon={CloseIcon} size="12px" />
        </div>

        {/* Header */}
        <div className={css.Header}>
          <Link
            className={css.Logo}
            event={new NavigationEvent({
              attributes: {
                dest_page_type: 'frontpages',
                dest_page_type_id: '',
                source_id: 'mobile_menu',
              },
              eventName: 'nav_link_click',
            })}
            href={urlFull}
          >
            <img
              alt="uiLibrary"
              src="https://res.cloudinary.com/uiLibrary/image/upload/v1570536495/frontend/uiLibrary-logo-with-text.svg"
            />
          </Link>
        </div>

        {/* Body */}
        <div>
          <LanguageToggle />

          {/* Categories */}
          <div>
            {map(categoriesMenu, ({ name, title }) => (
              <CategoryItem
                key={name}
                id={name}
                onTopCategoryClick={() => onTopCategoryClick(name)}
                title={title}
              />
            ))}
          </div>

          {/* Outlet link */}
          {outletCategory && (
            <div className={css.OutletItemWrap}>
              <Link
                event={new NavigationEvent({
                  attributes: {
                    dest_page_type: 'category',
                    dest_page_type_id: new Name(outletCategory.name).id,
                    source_id: 'mobile_menu',
                  },
                  eventName: 'nav_link_click',
                })}
                href={urlFull + outletCategory.slug}
              >
                <CategoryItem
                  id={outletCategory.name}
                  title={outletCategory.title}
                />
              </Link>
            </div>
          )}

          {/* CMS posts */}
          <CMSPosts />

          {/* Call us */}
          <div className={css.CallUs}>
            <a className={css.PhoneWrap} href={`tel:${phone}`}>
              <div className={css.PhoneIcon}>
                <SVGIcon color="primary" icon={PhoneIcon} size="24px" />
              </div>
              <span className={css.PhoneNumber}>{phone}</span>
            </a>
            <span className={css.OpenHours}>{t('header:PHONE_OPEN_HOURS')}</span>
          </div>

          {/* Cutomer support links */}
          <CustomerSupportMenu customerSupportData={customerSupportData} />
          <Footer store={store} />
        </div>
      </SidePane>

      {selectedCategory && (
        <SubCategoryMenu
          category={selectedCategory}
          isShowing={isSubMenuOpen}
          onCloseClick={onCloseSubCategory}
        />
      )}
    </>
  )
}
