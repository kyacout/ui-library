import filter from 'lodash/filter'
import join from 'lodash/join'
import replace from 'lodash/replace'

type CloudinaryOptionCrop =
  'crop'
  | 'fill'
  | 'fit'
  | 'lfill'
  | 'limit'
  | 'lpad'
  | 'mfit'
  | 'mpad'
  | 'pad'
  | 'scale'
  | 'thumb'

export interface CloudinaryOptions {
  /**
   * Crop
   *
   * [See here for more information](https://cloudinary.com/documentation/image_transformation_reference#crop_parameter)
   */
  crop?: CloudinaryOptionCrop

  /**
   * Fetch Format
   *
   * [See here for more information](https://cloudinary.com/documentation/image_transformation_reference#format_parameter)
   */
  fetchFormat?: 'auto' | 'png'

  /**
   * Height
   *
   * **Examples**
   * - 80 = 80px
   * - 0.2 = 20%
   *
   * [See here for more information](https://cloudinary.com/documentation/image_transformation_reference#height_parameter)
   */
  height?: number | string

  /**
   * Quality
   *
   * **Examples**
   * - 80 = 80%
   * - 100 = 100%
   * - auto = auto:good
   *
   * [See here for more information](https://cloudinary.com/documentation/image_transformation_reference#quality_parameter)
   */
  quality?: number | string

  /**
   * Width
   *
   * **Examples**
   * - 80 = 80px
   * - 0.2 = 20%
   * - auto = auto:100
   * - auto:25 = auto:25
   *
   * [See here for more information](https://cloudinary.com/documentation/image_transformation_reference#width_parameter)
   */
  width?: number | string
}

const defaultOptions: CloudinaryOptions = {
  crop: 'pad',
  fetchFormat: 'auto',
  quality: 'auto',
}

export const baseURL = 'https://res.cloudinary.com/uiLibrary/image/upload/'

export const imageURL = (path: string, options?: CloudinaryOptions): string => {
  const pathWithoutLeadingSlash = replace(path, /^\/+/, '')

  const {
    crop,
    fetchFormat,
    height,
    quality,
    width,
  } = {
    ...defaultOptions,
    ...options,
  }

  // The order of the parameters is important
  // Sort this alphabetically when adding a new prop (Boo)
  const parameters = join(
    filter([
      fetchFormat && `f_${fetchFormat}`,
      crop && `c_${crop}`,
      quality && `q_${quality}`,
      width && `w_${width}`,
      height && `h_${height}`,
    ]),
    ',',
  )

  return new URL(`${parameters}/${pathWithoutLeadingSlash}`, baseURL).toString()
}

export const svgURL = (path: string): string => new URL(path, baseURL).toString()
