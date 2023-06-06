import React, { FC } from 'react'

import {
  CloudinaryOptions,
  imageURL,
  svgURL,
} from '@Globals/Cloudinary'
import { Name } from '@Globals/Resource'

import css from './index.styl'

interface CloudinaryImageProps {
  alt?: string
  brand?: Name
  options?: CloudinaryOptions
  path: string
}

export const CloudinaryImage: FC<CloudinaryImageProps> = (
  {
    alt = '',
    brand,
    options,
    path,
  }: CloudinaryImageProps,
) => (
  <div className={css.CloudinaryImage}>
    <img
      alt={alt}
      loading="lazy"
      src={imageURL(path, options)}
    />
    {brand && brand.isValid() && (
      <div className={css.BrandOverlay}>
        <div className={css.ImageWrap}>
          <img
            alt=""
            loading="lazy"
            src={svgURL(`frontend/brand-logos/brand-logo-${brand.id}.svg`)}
          />
        </div>
      </div>
    )}
  </div>
)
