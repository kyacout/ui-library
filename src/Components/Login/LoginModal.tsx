import clsx from 'clsx'
import { Form, Formik } from 'formik'
import React, {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import UserIcon from '@Assets/SVG/User'
import { Button } from '@Components/Button'
import { TextField } from '@Components/FormElements/Formik/TextField'
import { SVGIcon } from '@Components/Icons'
import { FormStates } from '@Components/Login'
import { Modal, ModalProps } from '@Components/Modal'
import { handleEvent } from '@Events/Manager'
import { OtherEvent } from '@Events/Other'
import { storeURL } from '@Globals/Store'
import { UserContext } from '@Globals/User'

import css from './index.styl'

interface LoginModalProps extends ModalProps {
  handleResetPassword: () => void
  sourceID: string
}

export const LoginModal: FC<LoginModalProps> = ({
  handleResetPassword,
  sourceID,
  ...props
}: LoginModalProps) => {
  const { show } = props
  const { t } = useTranslation()
  const [loginFormState, setLoginFormState] = useState(FormStates.None)
  const { login } = useContext(UserContext)
  const createAccountURL = storeURL('customer/account/create')
  const afterLoginURL = storeURL('customer/account/')

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('validation:YOUR_EMAIL_IS_INVALID'))
      .required(t('validation:EMAIL_REQUIRED_TEXT')),
    password: Yup.string().required(t('validation:INPUT_FIELD_IS_REQUIRED')),
  })

  useEffect(() => {
    if (!props.show) {
      return
    }

    handleEvent(new OtherEvent({
      attributes: {
        source_id: sourceID,
      },
      eventName: 'login_overlay_open',
    }))
  }, [show])

  return (
    <Modal {...props}>
      <div className={css.Overlay}>
        <div
          className={clsx(
            css.SmallLoadingWrap,
            loginFormState === FormStates.Loading && css.Active,
          )}
        />
        <div className={css.Header}>
          <div className={css.IconWrap}>
            <SVGIcon icon={UserIcon} size="50px" />
          </div>
          <span>{t('header:LOG_IN_LABEL')}</span>
        </div>
        {loginFormState === FormStates.Failed && (
          <div className={`${css.Banner} ${css.Error}`}>
            {t('header:USER_LOGIN_PLEASE_CHECK_EMAIL_AND_PASSWORD')}
          </div>
        )}
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async ({ email, password }) => {
            setLoginFormState(FormStates.Loading)

            let isSuccess = false

            try {
              isSuccess = await login(email, password)
              if (!isSuccess) {
                throw new Error('failed to log in')
              }
            } catch (err) {
              setLoginFormState(FormStates.Failed)
            } finally {
              handleEvent(
                new OtherEvent({
                  attributes: {
                    is_success: isSuccess,
                    source_id: sourceID,
                  },
                  eventName: 'ca_login_res',
                }),
                isSuccess,
              )

              if (isSuccess) {
                window.location.href = afterLoginURL
              }
            }
          }}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={LoginSchema}
        >
          <Form className={css.Form}>
            <TextField label={t('header:EMAIL_ADDRESS')} name="email" type="email" />
            <TextField label={t('header:PASSWORD')} name="password" type="password" />
            <div className={css.ButtonsWrap}>
              <Button type="submit">{t('header:LOG_IN_LABEL')}</Button>
              <span
                className={css.ResetPassword}
                onClick={handleResetPassword}
              >
                {t('header:RESET_MY_PASSWORD')}
              </span>
              <a
                className={css.CreateNewAccount}
                href={createAccountURL}
              >
                {t('header:CREATE_AN_ACCOUNT')}
              </a>
            </div>
          </Form>
        </Formik>
      </div>
    </Modal>
  )
}
