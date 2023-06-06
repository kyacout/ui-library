import { Form, Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import { Button } from '@Components/Button'
import { TextField } from '@Components/FormElements/Formik/TextField'
import { handleEvent } from '@Events/Manager'
import { OtherEvent } from '@Events/Other'
import { identify } from '@Globals/MParticle/User'

import css from './index.styl'

export const NewsletterSubscriptionForm = ({ formSubmissionSuccessful }) => {
  const { t } = useTranslation()

  const NewsletterSignupSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('validation:YOUR_EMAIL_IS_INVALID'))
      .required(t('validation:EMAIL_REQUIRED_TEXT')),
  })

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={async ({ email }) => {
        try {
          await identify({ email })
          handleEvent(
            new OtherEvent({
              attributes: {
                source_id: 'side_bar',
              },
              eventName: 'newsletter_opt_in',
            }),
          )
          formSubmissionSuccessful()
        } catch (e) {
          console.error(e)
        }
      }}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={NewsletterSignupSchema}
    >
      <Form className={css.SignupForm}>
        <div className={css.TextFieldWrap}>
          <TextField
            label={t('sidebar:FOOTER_SIGN_UP_YOUR_EMAIL')}
            name="email"
            size="small"
            type="email"
          />
        </div>
        <div className={css.ButtonContainer}>
          <Button size="small" type="submit">{t('sidebar:YES_I_WANT_GREAT_EMAILS')}</Button>
        </div>
        <span className={css.Unsubscribe}>{t('sidebar:UNSUBSCRIBE_AT_ANY_TIME')}</span>
      </Form>
    </Formik>
  )
}

NewsletterSubscriptionForm.propTypes = {
  formSubmissionSuccessful: PropTypes.func.isRequired,
}
