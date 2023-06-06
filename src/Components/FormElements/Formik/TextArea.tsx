import { useField } from 'formik'
import React, { FC } from 'react'

import {
  TextArea as TextAreaUI,
  TextAreaProps as TextAreaUIProps,
} from '@Components/FormElements/UI/TextArea'

interface TextAreaProps extends TextAreaUIProps {
  // required in Formik
  name: string
}

export const TextArea: FC<TextAreaProps> = ({ ...props }: TextAreaProps) => {
  const [{ name, onChange }, { error }, { setError }] = useField(props)

  return (
    <TextAreaUI
      error={error}
      name={name}
      onChange={(e) => {
        onChange(e)
        setError(null)
      }}
      {...props}
    />
  )
}
