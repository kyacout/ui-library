export interface MarginsProps {
  m?: string
  mb?: string
  ml?: string
  mr?: string
  mt?: string
  mx?: string
  my?: string
}

export interface FormElementProps extends MarginsProps {
  animateLabel?: boolean
  error?: string
  id?: string
  label: string
}
