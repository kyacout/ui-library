import { useField } from 'formik'
import React, { FC } from 'react'

import {
  TextField as TextFieldUI,
  TextFieldProps as TextFieldUIProps,
} from '@Components/FormElements/UI/TextField'

interface TextFieldProps extends TextFieldUIProps {
  // required in Formik
  name: string
}

export const TextField: FC<TextFieldProps> = ({
  size,
  ...props
}: TextFieldProps) => {
  const [{ name, onChange }, { error }, { setError }] = useField(props)

  return (
    <TextFieldUI
      error={error}
      name={name}
      onChange={(e) => {
        onChange(e)
        setError(null)
      }}
      size={size}
      {...props}
    />
  )
}
