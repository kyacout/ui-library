import find from 'lodash/find'
import noop from 'lodash/noop'
import React, {
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

import { Link } from '@Components/Link'
import { handleEvent } from '@Events/Manager'
import { NavigationEvent } from '@Events/Navigation'
import { OtherEvent } from '@Events/Other'
import { MetadataContext } from '@Globals/Metadata'
import { Name } from '@Globals/Resource'
import { storeURL } from '@Globals/Store'

import { MegaMenu } from '../MegaMenu'
import css from './index.styl'
import { NavBarButton } from './NavBarButton'

const defaultState = {
  activeID: null,
  isFrozen: false,
  isHovering: false,
  isOpen: false,
  menuHoverID: null,
}

interface NavBarProps {
  blocked: boolean
  onBackdropChange: (showBackdrop: boolean) => void
}

export const NavBar: FC<NavBarProps> = (
  {
    blocked,
    onBackdropChange,
  }: NavBarProps,
) => {
  const { t } = useTranslation()
  const { categories } = useContext(MetadataContext)
  const outletCategory = useMemo(() => find(categories, ['name', 'categories/224']), [categories])
  const [
    {
      activeID,
      isFrozen,
      isHovering,
      isOpen,
      menuHoverID,
    },
    setState,
  ] = useState(defaultState)
  const categoryButtons = [
    {
      title: t('header:ALL_ACCESSORIES_LABEL'),
    },
    {
      title: t('header:SUIT_ACCESSORIES_LABEL'),
    },
    {
      title: t('header:JEWELLERY_LABEL'),
    },
    {
      title: t('header:BAGS_AND_WALLETS_LABEL'),
    },
  ]

  const openMegaMenu = (id: number) => {
    handleEvent(
      new OtherEvent({
        attributes: {
          menu_index: id,
        },
        eventName: 'nav_desktop_mega_menu_open',
      }),
    )

    setState(prev => ({
      ...prev,
      activeID: id,
      isHovering: true,
      isOpen: true,
    }))
  }

  const closeMegaMenu = (forceClose: boolean = false) => {
    if (isFrozen && !forceClose) {
      return
    }

    setState(prev => ({
      ...prev,
      activeID: null,
      isFrozen: false,
      isHovering: false,
      isOpen: false,
      menuHoverID: null,
    }))
  }

  const onCategoryClick = (id: number) => {
    if (activeID === id && isOpen) {
      closeMegaMenu()
      return
    }

    openMegaMenu(id)
  }

  const onCategoryMouseEnter = (id: number) => {
    setState(prev => ({
      ...prev,
      isFrozen: prev.isFrozen || !prev.isOpen,
      isHovering: true,
      menuHoverID: id,
    }))
  }

  const onCategoryMouseLeave = (id: number) => {
    setState(prev => ({
      ...prev,
      isHovering: false,
      menuHoverID: prev.menuHoverID !== id ? prev.menuHoverID : null,
    }))
  }

  const onMenuLeave = () => {
    closeMegaMenu(true)
  }

  // Handle hover open delay
  useEffect(() => {
    if (isOpen || !isHovering) {
      return noop
    }

    const timeout = setTimeout(
      () => {
        setState(prev => ({
          ...prev,
          activeID: prev.menuHoverID,
          isOpen: true,
        }))
      },
      250,
    )

    return () => {
      clearTimeout(timeout)
    }
  }, [isHovering, isOpen])

  // Clear isFrozen after a second
  useEffect(() => {
    if (!isFrozen) {
      return noop
    }

    const timeout = setTimeout(() => {
      setState(prev => ({
        ...prev,
        isFrozen: false,
      }))
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [isFrozen])

  // Show/hide backdrop
  useEffect(() => {
    onBackdropChange(isOpen)
  }, [isOpen])

  // Handle delay between hovering different menu ids
  useEffect(() => {
    if (!isOpen || menuHoverID === null) {
      return noop
    }

    const timeout = setTimeout(() => {
      openMegaMenu(menuHoverID)
    }, 250)

    return () => {
      clearTimeout(timeout)
    }
  }, [isOpen, menuHoverID])

  return (
    <div className={css.NavBar}>
      <div className={css.NavBarInner}>
        {/* Categories */}
        <div
          className={[css.CategoriesWrap, '-j-categories-wrap'].join(' ')}
          onMouseLeave={onMenuLeave}
        >
          {categoryButtons.map((item, i) => (
            <NavBarButton
              key={item.title}
              onCategoryClick={() => onCategoryClick(i)}
              onCategoryMouseEnter={() => onCategoryMouseEnter(i)}
              onCategoryMouseLeave={() => onCategoryMouseLeave(i)}
              title={item.title}
            />
          ))}

          {/* Mega menu */}
          <MegaMenu activeID={activeID} isOpen={!blocked && isOpen} />
        </div>

        {/* Other links */}
        <div className={css.OtherLinks}>
          {outletCategory && (
            <Link
              className={css.OtherLinkItem}
              event={new NavigationEvent({
                attributes: {
                  dest_page_type: 'category',
                  dest_page_type_id: new Name(outletCategory.name).id,
                  source_id: 'header',
                },
                eventName: 'nav_link_click',
              })}
              href={storeURL(outletCategory.slug)}
            >
              {outletCategory.title}
            </Link>
          )}
          <Link
            className={css.OtherLinkItem}
            event={new NavigationEvent({
              attributes: {
                dest_page_type: 'cms_category_collections',
                dest_page_type_id: '',
                source_id: 'header',
              },
              eventName: 'nav_link_click',
            })}
            href={storeURL('collections')}
          >
            {t('header:COLLECTIONS_LABEL')}
          </Link>
          <Link
            className={css.OtherLinkItem}
            event={new NavigationEvent({
              attributes: {
                dest_page_type: 'cms_category_articles',
                dest_page_type_id: '',
                source_id: 'header',
              },
              eventName: 'nav_link_click',
            })}
            href={storeURL('articles')}
          >
            {t('header:ARTICLES_LABEL')}
          </Link>
        </div>
      </div>
    </div>
  )
}
