import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik'
import * as yup from 'yup'
import RenderTodoItems from './RenderTodoItems'
import RenderFormAddItem from './RenderFormAddItem'

const RenderForm = ({ errors, touched, isSubmitting }) => (
  <Form>
    <div className="form-group">
      <label htmlFor="title">Title</label>
      <Field
        id="title"
        className={`form-control ${(errors.title && touched.title ? ' is-invalid' : '')}`}
        name="title"
        type="text"
      />
      <ErrorMessage component="div" className="invalid-feedback" name="title" />
    </div>

    <FieldArray name="TodoItems" component={RenderTodoItems} />

    <button className="btn btn-success" type="submit" disabled={isSubmitting}>Submit</button>
  </Form>
)
RenderForm.propTypes = {
  errors: PropTypes.shape().isRequired,
  touched: PropTypes.shape().isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

const RenderFormCreate = ({ errors, touched, isSubmitting }) => (
  <Form>
    <div className="form-group">
      <label htmlFor="title">Title</label>
      <Field
        id="title"
        className={`form-control ${(errors.title && touched.title ? ' is-invalid' : '')}`}
        name="title"
        type="text"
      />
      <ErrorMessage component="div" className="invalid-feedback" name="title" />
    </div>

    <button className="btn btn-success" type="submit" disabled={isSubmitting}>Submit</button>
  </Form>
)
RenderFormCreate.propTypes = {
  errors: PropTypes.shape().isRequired,
  touched: PropTypes.shape().isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

const todoChangeSchema = yup.object().shape({
  title: yup.string().required('Required'),
  TodoItems: yup.array().of(yup.object().shape({
    name: yup.string().required('Required'),
    checked: yup.boolean().required('Required')
  }))
})

const FormsTodosChange = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={todoChangeSchema}
    onSubmit={onSubmit}
    component={RenderForm}
  />
)
FormsTodosChange.propTypes = {
  initialValues: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired
}

export const FormsTodosCreate = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={todoChangeSchema}
    onSubmit={onSubmit}
    component={RenderFormCreate}
  />
)
FormsTodosCreate.propTypes = {
  initialValues: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired
}

export const FormsTodosAddItem = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={todoChangeSchema}
    onSubmit={onSubmit}
    component={RenderFormAddItem}
  />
)
FormsTodosAddItem.propTypes = {
  initialValues: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default FormsTodosChange
