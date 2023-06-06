import clsx from 'clsx'
import React, { FC, ReactElement } from 'react'

import { FormElementProps } from '@Components/FormElements/FormElementProps'
import css from '@Components/FormElements/index.styl'

export interface BaseFormInputProps extends FormElementProps {
  children: ReactElement
  formActive: boolean
}

export const BaseFormInput: FC<BaseFormInputProps> = ({
  animateLabel = true,
  children,
  error,
  formActive,
  id,
  label,
  ...props
}: BaseFormInputProps) => (
  <div className={css.FormElement} style={{ margin: calculateMargins(props) }}>
    <div
      className={clsx(
        css.FormElementInner,
        formActive && css.FormActive,
      )}
    >
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
    {error && <span className={css.ErrorMessage}>{error}</span>}
  </div>
)
