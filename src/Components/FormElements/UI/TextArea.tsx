import React, { FC, forwardRef } from 'react'

import { FormElementProps } from '@Components/FormElements/FormElementProps'
import { BaseFormInput } from '@Components/FormElements/UI/BaseFormInput'
import { useFormElementState } from '@Components/FormElements/useFormElementState'
import { useComponentID } from '@Globals/Unique'

export type TextAreaProps = FormElementProps & JSX.IntrinsicElements['textarea']

export const TextArea: FC<TextAreaProps> = forwardRef(
  (
    {
      adornments,
      error,
      id,
      label,
      name,
      size,
      variant,
      withoutLabelAnimation,
      wrapperClassName,
      ...props
    }: TextAreaProps,
    ref,
  ) => {
    const { formActive, ...state } = useFormElementState<'textarea'>({ ...props })
    const randomID = useComponentID(name)

    return (
      <BaseFormInput
        adornments={adornments}
        error={error}
        formActive={formActive}
        id={id || randomID}
        label={label}
        size={size}
        variant={variant}
        withoutLabelAnimation={withoutLabelAnimation}
        wrapperClassName={wrapperClassName}
        {...props}
      >
        <textarea
          id={id || randomID}
          name={name}
          placeholder={label}
          ref={ref}
          {...props}
          {...state}
        />
      </BaseFormInput>
    )
  },
)
