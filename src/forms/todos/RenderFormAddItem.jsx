import { FieldArray, Form } from 'formik'
import React from 'react'
import PropTypes from 'prop-types'
import RenderTodoItems from './RenderTodoItems'

const RenderFormAddItem = ({ isSubmitting }) => (
  <Form>
    <FieldArray name="TodoItems" component={RenderTodoItems} />
    <button className="btn btn-success" type="submit" disabled={isSubmitting}>Submit</button>
  </Form>
)
RenderFormAddItem.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
}

export default RenderFormAddItem