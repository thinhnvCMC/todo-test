import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'

import { FormsTodosAddItem, FormsTodosCreate } from '@/forms/todos/Change'

const ModalsTodosUpdate = ({ isEditTodo, close, onSubmit, todoId, todoTitle, initialValuesUpdate }) => {
  const initialValues = initialValuesUpdate || {
    title: todoTitle,
    id: todoId,
    TodoItems: [],
  }

  return(
    <Modal show onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Update Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isEditTodo ? 
          <FormsTodosAddItem initialValues={initialValues} onSubmit={onSubmit} /> 
          : <FormsTodosCreate initialValues={initialValues} onSubmit={onSubmit} />
        }
      </Modal.Body>
    </Modal>
  )
}
ModalsTodosUpdate.propTypes = {
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  todoId: PropTypes.number,
  todoTitle: PropTypes.string,
  initialValuesUpdate: PropTypes.object,
  isEditTodo: PropTypes.string
}

export default ModalsTodosUpdate
