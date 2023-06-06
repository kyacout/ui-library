import React, { FC } from 'react'

import BagsIcon from '@Assets/SVG/Categories/Bags'
import BeardCareIcon from '@Assets/SVG/Categories/BeardCare'
import BeltsIcon from '@Assets/SVG/Categories/Belts'
import BowTiesIcon from '@Assets/SVG/Categories/BowTies'
import BraceletsIcon from '@Assets/SVG/Categories/Bracelets'
import BracesIcon from '@Assets/SVG/Categories/Braces'
import CufflinksIcon from '@Assets/SVG/Categories/Cufflinks'
import EarringsIcon from '@Assets/SVG/Categories/Earrings'
import GlassesIcon from '@Assets/SVG/Categories/Glasses'
import GlovesIcon from '@Assets/SVG/Categories/Gloves'
import HatsIcon from '@Assets/SVG/Categories/Hats'
import LapelPinsIcon from '@Assets/SVG/Categories/LapelPins'
import NecklacesIcon from '@Assets/SVG/Categories/Necklaces'
import NecktiesIcon from '@Assets/SVG/Categories/Neckties'
import PocketSquaresIcon from '@Assets/SVG/Categories/PocketSquares'
import RingsIcon from '@Assets/SVG/Categories/Rings'
import ScarvesIcon from '@Assets/SVG/Categories/Scarves'
import ShavingIcon from '@Assets/SVG/Categories/Shaving'
import ShirtsIcon from '@Assets/SVG/Categories/Shirts'
import SunglassesIcon from '@Assets/SVG/Categories/Sunglasses'
import TieClipsIcon from '@Assets/SVG/Categories/TieClips'
import WalletsIcon from '@Assets/SVG/Categories/Wallets'
import WatchesIcon from '@Assets/SVG/Categories/Watches'
import { SVGIcon } from '@Components/Icons/SVGIcon'

const categoryIcons = {
  'categories/10': () => <SVGIcon icon={RingsIcon} />,
  'categories/11': () => <SVGIcon icon={EarringsIcon} />,
  'categories/112': () => <SVGIcon icon={ShavingIcon} />,
  'categories/13': () => <SVGIcon icon={NecktiesIcon} />,
  'categories/130': () => <SVGIcon icon={PocketSquaresIcon} />,
  'categories/135': () => <SVGIcon icon={HatsIcon} />,
  'categories/14': () => <SVGIcon icon={WatchesIcon} />,
  'categories/177': () => <SVGIcon icon={BeardCareIcon} />,
  'categories/195': () => <SVGIcon icon={LapelPinsIcon} />,
  'categories/201': () => <SVGIcon icon={BracesIcon} />,
  'categories/221': () => <SVGIcon icon={ScarvesIcon} />,
  'categories/223': () => <SVGIcon icon={ShirtsIcon} />,
  'categories/31': () => <SVGIcon icon={GlassesIcon} />,
  'categories/33': () => <SVGIcon icon={BeltsIcon} />,
  'categories/35': () => <SVGIcon icon={TieClipsIcon} />,
  'categories/36': () => <SVGIcon icon={CufflinksIcon} />,
  'categories/42': () => <SVGIcon icon={GlovesIcon} />,
  'categories/5': () => <SVGIcon icon={WalletsIcon} />,
  'categories/6': () => <SVGIcon icon={NecklacesIcon} />,
  'categories/63': () => <SVGIcon icon={BagsIcon} />,
  'categories/68': () => <SVGIcon icon={BowTiesIcon} />,
  'categories/7': () => <SVGIcon icon={BraceletsIcon} />,
  'categories/9': () => <SVGIcon icon={SunglassesIcon} />,
}

interface CategoryIconProps {
  name: string
}

export const CategoryIcon: FC<CategoryIconProps> = (
  {
    name,
  }: CategoryIconProps,
) => {
  if (!categoryIcons[name]) {
    return null
  }

  return categoryIcons[name]()
}
