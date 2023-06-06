import {
  ChangeEvent,
  ComponentProps,
  FocusEvent,
  useState,
} from 'react'

interface FormElementState {
  formActive: boolean
  onBlur: (e: FocusEvent<any>) => void
  onChange: (e: ChangeEvent<any>) => void
  onFocus: (e: FocusEvent<any>) => void
}

export function useFormElementState<T extends 'input' | 'textarea'>({
  onBlur = () => {},
  onChange = () => {},
  onFocus = () => {},
}: ComponentProps<T>): FormElementState {
  const [formActive, setFormActive] = useState(false)
  return {
    formActive,
    onBlur: (e) => {
      onBlur(e)
      setFormActive(!!e.currentTarget.value)
    },
    onChange: (e) => {
      onChange(e)
      setFormActive(!!e.currentTarget.value)
    },
    onFocus: (e) => {
      onFocus(e)
      setFormActive(!!e.currentTarget.value)
    },
  }
}
