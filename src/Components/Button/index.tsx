/* eslint-disable react/button-has-type */
import clsx from 'clsx'
import React, { FC } from 'react'

import css from './index.styl'

type HTMLButtonProps = JSX.IntrinsicElements['button']

export interface ButtonProps extends HTMLButtonProps {
  color?: 'dark' | 'primary' | 'white'
  disabled?: boolean,
  size?: 'medium' | 'small'
  variant?: 'full' | 'outlined'
}

export const Button: FC<ButtonProps> = (
  {
    children,
    color = 'primary',
    disabled = false,
    size = 'medium',
    type = 'button',
    variant = 'full',
    ...props
  }: ButtonProps,
) => (
  <button
    className={clsx(
      css.Button,
      color === 'dark' && css.ButtonColorDark,
      color === 'primary' && css.ButtonColorPrimary,
      color === 'white' && css.ButtonColorWhite,
      disabled && css.ButtonDisabled,
      size === 'medium' && css.ButtonSizeMedium,
      size === 'small' && css.ButtonSizeSmall,
      variant === 'full' && css.ButtonVariantFull,
      variant === 'outlined' && css.ButtonVariantOutlined,
    )}
    disabled={disabled}
    type={type}
    {...props}
  >
    <span>{children}</span>
  </button>
)
