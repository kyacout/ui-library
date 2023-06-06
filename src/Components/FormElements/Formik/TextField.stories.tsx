import { Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import { Button } from '@Components/Button'

import { TextField } from './TextField'

export default {
  component: TextField,
  title: 'Form Elements/Formik/TextField',
}

const Schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
})

export const Default = () => (
  <Formik
    initialValues={{ name: '' }}
    onSubmit={() => {}}
    validateOnBlur={false}
    validateOnChange={false}
    validationSchema={Schema}
  >
    <Form>
      <TextField label="Full name" name="name" />
      <Button>Submit</Button>
    </Form>
  </Formik>
)
