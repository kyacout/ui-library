import { Form, Formik } from 'formik'
import React, { FC, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import { Button } from '@Components/Button'
import { ButtonWithProgress } from '@Components/Button/ButtonWithProgress'
import { TextField } from '@Components/FormElements/Formik/TextField'
import { FormStates } from '@Components/Login'
import { Modal, ModalProps } from '@Components/Modal'
import { handleEvent } from '@Events/Manager'
import { OtherEvent } from '@Events/Other'
import { UserContext } from '@Globals/User'

import css from './index.styl'

interface PasswordResetProps extends ModalProps {
  handleBackToLogin: () => void
  sourceID: string
}

interface BannerProps {
  formState: FormStates
}

const Banner: FC<BannerProps> = ({ formState }: BannerProps) => {
  const { t } = useTranslation()

  if (formState === FormStates.Success) {
    return (
      <div className={`${css.Banner} ${css.Success}`}>
        {t('header:USER_LOGIN_WE_HAVE_SENT_YOU_A_NEW_PASSWORD')}
      </div>
    )
  }

  if (formState === FormStates.Failed) {
    return (
      <div className={`${css.Banner} ${css.Error}`}>
        {t('common:SOMETHING_WENT_WRONG_PLEASE_CONTACT_US')}
      </div>
    )
  }

  return null
}

export const ResetPasswordModal: FC<PasswordResetProps> = ({
  handleBackToLogin,
  sourceID,
  ...props
}: PasswordResetProps) => {
  const { t } = useTranslation()
  const [formState, setFormState] = useState(FormStates.None)
  const { resetPassword } = useContext(UserContext)

  const PasswordResetSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('validation:YOUR_EMAIL_IS_INVALID'))
      .required(t('validation:EMAIL_REQUIRED_TEXT')),
  })

  return (
    <Modal {...props}>
      <div className={css.Overlay}>
        <div className={css.Header}>
          <span>{t('header:RESET_MY_PASSWORD')}</span>
        </div>
        <Banner formState={formState} />
        <Formik
          initialValues={{ email: '' }}
          onSubmit={async ({ email }) => {
            setFormState(FormStates.Loading)

            let isSuccess = false

            try {
              isSuccess = await resetPassword(email)

              if (!isSuccess) {
                throw new Error('failed to reset password')
              }

              setFormState(FormStates.Success)
            } catch (err) {
              setFormState(FormStates.Failed)
            } finally {
              handleEvent(new OtherEvent({
                attributes: {
                  is_success: isSuccess,
                  source_id: sourceID,
                },
                eventName: 'ca_pwd_reset_res',
              }))
            }
          }}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={PasswordResetSchema}
        >
          <Form className={css.Form}>
            <TextField label={t('header:EMAIL_ADDRESS')} name="email" type="email" />
            <div className={css.ButtonsWrap}>
              <ButtonWithProgress
                loading={formState === FormStates.Loading}
                type="submit"
              >
                {t('header:RESET_MY_PASSWORD')}
              </ButtonWithProgress>
              <Button onClick={handleBackToLogin} variant="outlined">
                {t('header:BACK_TO_LOGIN')}
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </Modal>
  )
}
