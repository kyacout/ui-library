import { Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import { Button } from '@Components/Button'

import { TextArea } from './TextArea'

export default {
  component: TextArea,
  title: 'Form Elements/Formik/TextArea',
}

const Schema = Yup.object().shape({
  message: Yup.string().required('Message is required'),
})

export const Default = () => (
  <Formik
    initialValues={{ message: '' }}
    onSubmit={() => {}}
    validateOnBlur={false}
    validateOnChange={false}
    validationSchema={Schema}
  >
    <Form>
      <TextArea label="Your message" name="message" />
      <Button>Submit</Button>
    </Form>
  </Formik>
)
