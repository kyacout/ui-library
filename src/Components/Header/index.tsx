import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import clsx from 'clsx'
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'

import { Backdrop } from '@Components/Backdrop'
import { CookieBar } from '@Components/CookieBar'
import { CoronaBar } from '@Components/CoronaBar'
import { DesktopSearchResults } from '@Components/Search/Desktop'
import { MobileSearchResults } from '@Components/Search/Mobile'
import { StickyTopBar } from '@Components/StickyTopBar'
import { YOLOBar } from '@Components/YOLOBar'
import { MetadataContext } from '@Globals/Metadata'
import { Experiment } from '@Globals/SplitTests/Experiment'
import ShowFloatingMobileHeader from '@Globals/Stylus/Transitions/ShowFloatingMobileHeader.styl'
import { useMediaQuery } from '@Globals/useMediaQuery'

import css from './index.styl'
import { MainBar } from './MainBar'
import { Menu } from './Menu'
import { USPBar, USPBarProps } from './USPBar'

const defaultHeaderState = {
  backdrops: {
    menu: false,
    search: false,
  },
  showBackdrop: false,
}

const uspBarSpacingA = (storeName: string): USPBarProps['evenSpacingOnSmallDesktop'] => {
  switch (storeName) {
    case 'stores/14':
    case 'stores/23':
      return true
    default:
      return false
  }
}

const uspBarSmallTextDesktopA = (storeName: string): USPBarProps['smallTextOnSmallDesktop'] => {
  switch (storeName) {
    case 'stores/6':
    case 'stores/22':
      return true
    default:
      return false
  }
}

const uspBarSmallTextBelowPhabletA = (
  storeName: string,
): USPBarProps['smallTextOnSmallDesktop'] => {
  switch (storeName) {
    case 'stores/6':
    case 'stores/17':
      return true
    default:
      return false
  }
}

const uspBarSmallTextBelowPhoneA = (storeName: string): USPBarProps['smallTextOnSmallDesktop'] => {
  switch (storeName) {
    case 'stores/10':
    case 'stores/12':
    case 'stores/20':
    case 'stores/22':
    case 'stores/30':
      return true
    default:
      return false
  }
}

const uspBarSpacingB = (storeName: string): USPBarProps['evenSpacingOnSmallDesktop'] => {
  switch (storeName) {
    case 'stores/6':
    case 'stores/9':
    case 'stores/10':
    case 'stores/12':
    case 'stores/14':
    case 'stores/15':
    case 'stores/17':
    case 'stores/18':
    case 'stores/19':
    case 'stores/20':
    case 'stores/22':
    case 'stores/23':
    case 'stores/24':
    case 'stores/34':
    case 'stores/36':
      return true
    default:
      return false
  }
}

const uspBarSmallTextDesktopB = (storeName: string): USPBarProps['smallTextOnSmallDesktop'] => {
  switch (storeName) {
    case 'stores/6':
    case 'stores/10':
    case 'stores/12':
    case 'stores/14':
    case 'stores/16':
    case 'stores/17':
    case 'stores/20':
    case 'stores/22':
    case 'stores/23':
    case 'stores/34':
    case 'stores/36':
      return true
    default:
      return false
  }
}

const uspBarSmallTextBelowPhabletB = (
  storeName: string,
): USPBarProps['smallTextOnSmallDesktop'] => {
  switch (storeName) {
    case 'stores/6':
    case 'stores/10':
    case 'stores/12':
    case 'stores/17':
    case 'stores/20':
    case 'stores/23':
    case 'stores/34':
      return true
    default:
      return false
  }
}

const scrollStateDefault = {
  isMenuVisible: false,
  overThreshold: false,
  threshold: 0,
}

const scrollVariables = {
  direction: 'down',
  downStart: null,
  lastDirection: 'up',
  upStart: null,
}

const floatingHeaderFixedHeight = 86

export const Header = () => {
  const { store } = useContext(MetadataContext)
  const [
    {
      backdrops,
      showBackdrop,
    },
    setHeaderState,
  ] = useState(defaultHeaderState)
  const headerRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery('(min-width:1024px)')

  const [
    {
      isMenuVisible,
      overThreshold,
      threshold,
    },
    setScrollState,
  ] = useState(scrollStateDefault)

  const calculateThreshold = () => {
    const { height } = headerRef.current?.getBoundingClientRect() || { height: 0 }

    setScrollState(prev => ({ ...prev, threshold: height }))
  }

  useEffect(() => {
    calculateThreshold()
  }, [headerRef])

  const onBackdropChange = (placement: string, isOpen: boolean) => {
    setHeaderState((prev) => {
      const newBackdrops = {
        ...prev.backdrops,
        [placement]: isOpen,
      }

      return {
        ...prev,
        backdrops: newBackdrops,
        showBackdrop: newBackdrops.menu || newBackdrops.search,
      }
    })
  }

  useScrollPosition(({ currPos, prevPos }) => {
    if (isDesktop) {
      return
    }

    const direction = currPos.y < prevPos.y ? 'down' : 'up'
    const overThresholdNew = overThreshold
      ? threshold - floatingHeaderFixedHeight + currPos.y <= 0
      : threshold + 100 + currPos.y <= 0

    setScrollState(prev => ({ ...prev, overThreshold: overThresholdNew }))

    if (direction === 'down') {
      if (overThresholdNew) {
        scrollVariables.upStart = currPos.y
      }

      if (currPos.y - scrollVariables.downStart <= -20) {
        setScrollState(prev => ({ ...prev, isMenuVisible: false }))
        return
      }

      return
    }

    if (overThreshold && direction === 'up') {
      scrollVariables.downStart = currPos.y

      if (scrollVariables.upStart && scrollVariables.upStart - currPos.y <= -20) {
        setScrollState(prev => ({ ...prev, isMenuVisible: true }))
        return
      }

      return
    }
  }, [isDesktop, overThreshold, threshold])

  return (
    <>
      {/* Mega menu backdrop */}
      <Backdrop isShowing={showBackdrop} type="behind-header" />

      <CookieBar />

      {/* Mobile spacing */}
      <div
        className={clsx(
          css.mobileSpacing,
          overThreshold && css.show,
        )}
        style={{ height: threshold }}
      />

      <CSSTransition
        classNames={ShowFloatingMobileHeader}
        in={isMenuVisible}
        timeout={{ enter: 125, exit: 0 }}
      >
        {/* Site header */}
        <header
          className={clsx(
            css.header,
            overThreshold && css.isFloating,
            overThreshold && isMenuVisible && css.isFloatingVisible,
          )}
          ref={headerRef}
        >
          <StickyTopBar onVisibilityChange={() => calculateThreshold()} />
          <YOLOBar onVisibilityChange={() => calculateThreshold()} />
          <CoronaBar hide={overThreshold} />
          <Experiment
            A={(
              <USPBar
                evenSpacingOnSmallDesktop={uspBarSpacingA(store?.name)}
                smallTextBelowPhablet={uspBarSmallTextBelowPhabletA(store?.name)}
                smallTextBelowPhone={uspBarSmallTextBelowPhoneA(store?.name)}
                smallTextOnSmallDesktop={uspBarSmallTextDesktopA(store?.name)}
                useText={false}
              />
            )}
            B={(
              <USPBar
                evenSpacingOnSmallDesktop={uspBarSpacingB(store?.name)}
                smallTextBelowPhablet={uspBarSmallTextBelowPhabletB(store?.name)}
                smallTextOnSmallDesktop={uspBarSmallTextDesktopB(store?.name)}
                useText
              />
            )}
            test="shipping_options_focus_v2"
          />
          <MainBar hide={overThreshold} />
          <Menu
            blocked={backdrops.search}
            onBackdropChange={isOpen => onBackdropChange('menu', isOpen)}
          />
        </header>
      </CSSTransition>

      <DesktopSearchResults onBackdropChange={isOpen => onBackdropChange('search', isOpen)} />
      <MobileSearchResults />
    </>
  )
}
