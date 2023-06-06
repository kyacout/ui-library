// import clsx from 'clsx'
import clsx from 'clsx'
import React, { FC } from 'react'

import { Button, ButtonProps } from '@Components/Button'
import { Progress, ProgressProps } from '@Components/Progress'

import css from './ButtonWithProgress.styl'

interface ButtonWithProgressProps extends ButtonProps {
  loading: boolean,
}

const progressColor = (
  buttonColor: ButtonProps['color'],
  buttonVariant: ButtonProps['variant'],
): ProgressProps['color'] => {
  if (buttonVariant === 'outlined') {
    if (buttonColor === 'primary') {
      return 'primary'
    }
    return 'grey'
  }

  if (buttonColor === 'white') {
    return 'grey'
  }

  return 'white'
}

const progressSize = (
  buttonSize: ButtonProps['size'],
): ProgressProps['size'] => {
  if (buttonSize === 'small') {
    return 'x-small'
  }

  return 'small'
}

export const ButtonWithProgress: FC<ButtonWithProgressProps> = (
  {
    children,
    color = 'primary',
    loading = false,
    size = 'medium',
    variant = 'full',
    ...props
  }: ButtonWithProgressProps,
) => (
  <div
    className={clsx(
      css.ButtonWithProgress,
      loading && css.ButtonWithProgressIsLoading,
    )}
  >
    <Button
      color={color}
      size={size}
      variant={variant}
      {...props}
    >
      {children}
    </Button>
    {loading && (
      <Progress
        center
        color={progressColor(color, variant)}
        size={progressSize(size)}
      />
    )}
  </div>
)
