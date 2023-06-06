import React, { FC } from 'react'
import ModalCore from 'react-overlays/Modal'

import { Dialog, DialogProps } from './Dialog'
import { Fade } from './Fade'
import css from './index.styl'

export interface ModalProps extends DialogProps {
  easyClose?: boolean
  onHide: () => void
  show?: boolean
}

export const Modal: FC<ModalProps> = ({
  easyClose = true,
  onHide,
  show = false,
  ...props
}: ModalProps) => (
  <ModalCore
    backdropTransition={Fade}
    onBackdropClick={() => easyClose && onHide()}
    onEscapeKeyDown={() => easyClose && onHide()}
    onHide={onHide}
    renderBackdrop={renderProps => <div {...renderProps} className={css.backdrop} />}
    renderDialog={
      // The modelWrapper blocks clicking events from reaching the backdrop so it should handle
      // closing the modal itself
      renderProps => (
        <div {...renderProps} className={css.root} onClick={() => easyClose && onHide()}>
          <Dialog {...props} onHide={onHide} />
        </div>
      )
    }
    show={show}
    transition={Fade}
  />
)
