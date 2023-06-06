import { Form, Formik } from 'formik'
import inRange from 'lodash/inRange'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup'

import { ButtonWithProgress } from '@Components/Button/ButtonWithProgress'
import { SuggestionsModal } from '@Components/Contact/SuggestionsModal'
import { TextArea } from '@Components/FormElements/Formik/TextArea'
import { TextField } from '@Components/FormElements/Formik/TextField'
import { Link } from '@Components/Link'
import { Modal } from '@Components/Modal'
import { handleEvent } from '@Events/Manager'
import { NavigationEvent } from '@Events/Navigation'
import { OtherEvent } from '@Events/Other'
import { useSuggestionLinks } from '@Globals/API/Info/SuggestionLinks'
import { MetadataContext } from '@Globals/Metadata'
import Sentry from '@Globals/Sentry'
import { storeURL } from '@Globals/Store'
import { useTranslation } from '@Globals/Translations'

import css from './Content.styl'

interface ContactEmailResponse {
  status: 'OK' | 'ERROR'
}

type ContactFormState = 'default' | 'error' | 'loading' | 'success' | 'suggestions'

export const ContactContent = () => {
  const { t, tDanger } = useTranslation()

  const { store } = useContext(MetadataContext)

  const storeEmail = store?.config?.email
  const [state, setState] = useState<ContactFormState>('default')
  const [suggestionLinks, fetchSuggestionLinks] = useSuggestionLinks(store?.name)

  const ContactSignupSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('validation:YOUR_EMAIL_IS_INVALID'))
      .required(t('validation:EMAIL_REQUIRED_TEXT')),
    message: Yup.string().required(t('validation:INPUT_FIELD_IS_REQUIRED')),
    name: Yup.string().required(t('validation:INPUT_FIELD_IS_REQUIRED')),
    subject: Yup.string().required(t('validation:INPUT_FIELD_IS_REQUIRED')),
  })
  const submitFormURL = storeURL('contacts/index/post/')

  const onSubmitForm = async ({
    email,
    message,
    name,
    orderNumber,
    subject,
  }) => {
    if (suggestionLinks.length > 0 && state !== 'suggestions') {
      setState('suggestions')
      return
    }

    setState('loading')

    const data = new FormData()
    data.set('comment', message)
    data.set('email', email)
    data.set('name', name)
    data.set('orderid', orderNumber)
    data.set('subject', subject)

    let isSuccess = false

    try {
      const res = await fetch(submitFormURL, {
        body: data,
        method: 'post',
      })

      if (!inRange(res.status, 200, 400)) {
        throw new Error(`bad status code: ${res.status}`)
      }

      const result: ContactEmailResponse = JSON.parse(await res.text())
      if (result?.status !== 'OK') {
        throw new Error(`bad response: ${result?.status ?? 'invalid'}`)
      }

      setState('success')
      isSuccess = true
    } catch (e) {
      Sentry.captureException(e)
      setState('error')
    } finally {
      handleEvent(new OtherEvent({
        attributes: {
          is_success: isSuccess,
        },
        eventName: 'contact_email_sent_res',
      }))

      const url = new URL(window?.location?.href)
      if (isSuccess && url.searchParams.get('return-broken') === '1') {
        handleEvent(new OtherEvent({
          attributes: {},
          eventName: 'return_broken_email_sent',
        }))
      }
    }
  }

  return (
    <>
      <div className={css.TitleContainer}>
        <h1>{t('contact:CONTACT_PAGE_TITLE')}</h1>
        <p className={css.Subtitle}>{t('contact:CONTACT_PAGE_INTRO_TEXT')}</p>
      </div>
      <div className={css.ContactArea}>
        <Formik
          initialValues={{
            email: '',
            message: '',
            name: '',
            orderNumber: '',
            subject: '',
          }}
          onSubmit={onSubmitForm}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={ContactSignupSchema}
        >
          {({ handleSubmit }) => (
            <Form className={css.ContactForm}>
              <TextField
                label={t('contact:CONTACT_PAGE_SUBJECT_PLACEHOLDER_LABEL')}
                name="subject"
                onKeyUp={e => fetchSuggestionLinks((e.target as HTMLInputElement).value || '')}
              />
              <TextArea
                label={t('contact:CONTACT_PAGE_MESSAGE_PLACEHOLDER_LABEL')}
                name="message"
              />
              <TextField
                label={t('contact:CONTACT_PAGE_NAME_PLACEHOLDER_LABEL')}
                name="name"
              />
              <TextField
                label={t('contact:FOOTER_SIGN_UP_YOUR_EMAIL')}
                name="email"
                type="email"
              />
              <TextField
                label={t('contact:CONTACT_PAGE_ORDER_NUMBER_LABEL')}
                name="orderNumber"
              />
              <div className={css.ButtonContainer}>
                <ButtonWithProgress
                  loading={state === 'loading'}
                  type="submit"
                >
                  {t('contact:SEND_EMAIL_LABEL')}
                </ButtonWithProgress>
              </div>
              <SuggestionsModal
                onHide={() => setState('default')}
                show={state === 'suggestions'}
                submit={handleSubmit}
                suggestionsList={suggestionLinks}
              />
            </Form>
          )}
        </Formik>
        {suggestionLinks.length > 0 && (
        <div className={css.PossibleAnswers}>
          <div className={css.TextArea}>
            <p className={css.Title}>{t('contact:CONTACT_PAGE_POSSIBLE_ANSWERS_TITLE')}</p>
            {suggestionLinks.map(l => (
              <Link
                key={l.text}
                className={css.Link}
                event={new NavigationEvent({
                  attributes: {
                    dest_page_type: 'info',
                    dest_page_type_id: l.id,
                    source_id: 'link_suggestion',
                  },
                  eventName: 'nav_link_click',
                })}
                href={l.href}
                rel="noreferrer"
                target="_blank"
              >
                {l.text}
              </Link>
            ))}
          </div>
        </div>
        )}
      </div>
      <div
        className={css.SendUsEmailAt}
        {...tDanger('contact:OR_SEND_US_AN_EMAIL_AT_X', {
          arg1: `<a href="mailto:${storeEmail}">${storeEmail}</a>`,
        })}
      />
      <Modal
        button="close"
        onHide={() => setState('default')}
        show={state === 'success'}
        title={t('contact:CONTACT_PAGE_SUCCESS_TITLE')}
        variant="success"
      >
        {t('contact:CONTACT_PAGE_SUCCESS_MESSAGE')}
      </Modal>
      <Modal
        button="close"
        onHide={() => setState('default')}
        show={state === 'error'}
        variant="error"
      >
        {t('common:SOMETHING_WENT_WRONG_PLEASE_CONTACT_US')}
      </Modal>
    </>
  )
}
