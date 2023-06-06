import { MarginsProps } from './FormElementProps'

enum MARGINS {
  Top, Right, Bottom, Left
}

const MARGINS_DEFAULT = ['0', '0', '15px', '0']

export const calculateMargins = (props: MarginsProps): string => {
  const {
    m,
    mb,
    ml,
    mr,
    mt,
    mx,
    my,
  } = props
  const margins = m ? [m, m, m, m] : [...MARGINS_DEFAULT]

  if (mx) {
    margins[MARGINS.Right] = mx
    margins[MARGINS.Left] = mx
  }
  if (my) {
    margins[MARGINS.Top] = my
    margins[MARGINS.Bottom] = my
  }
  if (mt) { margins[MARGINS.Top] = mt }
  if (mr) { margins[MARGINS.Right] = mr }
  if (mb) { margins[MARGINS.Bottom] = mb }
  if (ml) { margins[MARGINS.Left] = ml }

  return margins.join(' ')
}
