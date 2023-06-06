import clsx from 'clsx'
import React, {
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

import CloseIcon from '@Assets/SVG/Close'
import { Button } from '@Components/Button'
import { SVGIcon } from '@Components/Icons'
import { ErrorContent } from '@Components/Modal/Dialog/ErrorContent'
import { SuccessContent } from '@Components/Modal/Dialog/SuccessContent'

import css from './index.styl'

export interface DialogProps {
  button?: 'close' | 'okay'
  children?: ReactNode
  easyClose?: boolean
  hideCloseButton?: boolean
  maxWidth?: string
  onHide: () => void
  title?: string
  variant?: 'default' | 'error' | 'success'
}

export interface ContentProps {
  children: ReactNode
  title?: string
  variant: 'default' | 'error' | 'success'
}

const Content: FC<ContentProps> = ({ children, variant, ...props }: ContentProps) => {
  if (variant === 'success') {
    return <SuccessContent {...props}>{children}</SuccessContent>
  }
  if (variant === 'error') {
    return <ErrorContent {...props}>{children}</ErrorContent>
  }
  return <>{children}</>
}

export const Dialog: FC<DialogProps> = ({
  button,
  children,
  hideCloseButton = false,
  maxWidth = '500px',
  onHide,
  title,
  variant = 'default',
}: DialogProps) => {
  const { t } = useTranslation()
  const [tall, setTall] = useState(false)
  const modalWrapperRef = useRef(null)

  const buttonTemplates = {
    close: <Button onClick={onHide} type="button">{t('common:CLOSE')}</Button>,
    okay: <Button onClick={onHide} type="button">{t('common:OKAY')}</Button>,
  }

  // slightly move the modal up if its taller than window height (minus a margin of 100px)
  useEffect(() => {
    if (modalWrapperRef?.current?.clientHeight > window.innerHeight - 100) {
      setTall(true)
    }
  }, [modalWrapperRef?.current?.clientHeight])

  return (
    <div
      className={clsx(
        css.dialog,
        tall && css.tall,
      )}
      onClick={e => e.stopPropagation()}
      ref={modalWrapperRef}
      style={{ width: maxWidth }}
    >
      {!hideCloseButton && (
        <div className={css.close} onClick={onHide}>
          <SVGIcon icon={CloseIcon} size="14px" />
        </div>
      )}
      <div
        className={clsx(
          css.body,
          hideCloseButton && css.hideCloseButton,
        )}
      >
        <Content title={title} variant={variant}>{children}</Content>
      </div>
      {button && (
        <div className={css.footer}>
          <div className={css.buttonContainer}>{buttonTemplates[button]}</div>
        </div>
      )}
    </div>
  )
}
