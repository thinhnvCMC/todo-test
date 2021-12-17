import { FieldArray, Form } from 'formik'
import React from 'react'
import PropTypes from 'prop-types'

const RenderFormEditTodo = ({ errors, touched, isSubmitting }) => (
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
export default RenderFormEditTodo