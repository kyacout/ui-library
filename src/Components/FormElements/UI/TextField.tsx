import React, { FC, forwardRef } from 'react'

import { FormElementProps } from '@Components/FormElements/FormElementProps'
import { BaseFormInput } from '@Components/FormElements/UI/BaseFormInput'
import { useFormElementState } from '@Components/FormElements/useFormElementState'
import { useComponentID } from '@Globals/Unique'

export type TextFieldProps = FormElementProps & Omit<JSX.IntrinsicElements['input'], 'size'>

export const TextField: FC<TextFieldProps> = forwardRef(
  (
    { animateLabel, ...props }: TextFieldProps,
    ref,
  ) => {
    const { formActive, ...state } = useFormElementState<'input'>({ ...props })
    const randomID = useComponentID(name)

    return (
      <BaseFormInput animateLabel={animateLabel} formActive={formActive} {...props}>
        <input ref={ref} {...props} {...state} />
      </BaseFormInput>
    )
  },
)
