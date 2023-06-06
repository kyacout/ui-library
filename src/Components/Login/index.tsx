import React, { FC, useState } from 'react'

import { ModalProps } from '@Components/Modal'

import { LoginModal } from './LoginModal'
import { ResetPasswordModal } from './ResetPasswordModal'

export enum FormStates {
  None,
  Loading,
  Failed,
  Success,
}

interface LoginModalsProps extends ModalProps {
  sourceID: string
}

export const LoginModals: FC<LoginModalsProps> = (props: LoginModalsProps) => {
  const [isResetPassword, setIsResetPassword] = useState(false)

  if (isResetPassword) {
    return <ResetPasswordModal handleBackToLogin={() => setIsResetPassword(false)} {...props} />
  }
  return <LoginModal handleResetPassword={() => setIsResetPassword(true)} {...props} />
}
