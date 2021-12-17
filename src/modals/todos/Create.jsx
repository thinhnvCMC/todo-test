import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'

import { FormsTodosCreate } from '@/forms/todos/Change'

const initialValuesCreate = {
  title: '',
  TodoItems: []
}

const ModalsTodosCreate = ({ close, onSubmit }) => (
  <Modal show onHide={close}>
    <Modal.Header closeButton>
      <Modal.Title>Create Todo</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FormsTodosCreate
        initialValues={initialValuesCreate}
        onSubmit={onSubmit}
      />
    </Modal.Body>
  </Modal>
)
ModalsTodosCreate.propTypes = {
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default ModalsTodosCreate
