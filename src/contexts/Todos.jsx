import React, { useReducer, createContext } from 'react'
import PropTypes from 'prop-types'
import produce from 'immer'
import axios from 'axios'

const actions = {
  setTodos: (payload) => ({ type: 'setTodos', payload }),
  unsetTodos: () => ({ type: 'unsetTodos' }),
  setTodo: (payload) => ({ type: 'setTodo', payload }), 
  unsetTodo: () => ({ type: 'unsetTodo' }),
  addItemTodo: (payload) => ({ type: 'addItemTodo', payload }),
  editTodo: (payload) => ({ type: 'editTodo', payload }),
  deleteTodo: (payload) => ({ type: 'deleteTodo', payload }),
  editItem: (payload) => ({ type: 'editItem', payload }),
}

const api = (dispatch) => ({
  getTodos: () => {
    axios({
      method: 'GET',
      url: 'https://fswdi-api-todos.herokuapp.com/api/todos'
    }).then((resp) => {
      dispatch(actions.setTodos(resp.data))
    })
  },
  resetTodos: () => {
    dispatch(actions.unsetTodos())
  },
  createTodo: (values) => new Promise((resolve, reject) => axios({
    method: 'POST',
    url: 'https://fswdi-api-todos.herokuapp.com/api/todos',
    data: values
  }).then((resp) => {
    resolve(resp)
  }).catch((err) => {
    reject(err)
  })),
  getTodo: (TodoId) => {
    axios({
      method: 'GET',
      url: `https://fswdi-api-todos.herokuapp.com/api/todos/${TodoId}`
    }).then((resp) => {
      dispatch(actions.setTodo(resp.data))
    }).catch(() => {
      dispatch(actions.setTodo({ todo: null }))
    })
  },
  resetTodo: () => {
    dispatch(actions.unsetTodo())
  },
  addItem: (values) => new Promise((resolve, reject) => axios({
    method: 'POST',
    url: `https://fswdi-api-todos.herokuapp.com/api/todos/${values.id}/todo-items`,
    data: values.TodoItems[0]
  }).then((resp) => {
    dispatch(actions.addItemTodo(resp.data))
    resolve(resp)
  }).catch((err) => {
    reject(err)
  })),
  editTodo: (values) => new Promise((resolve, reject) => axios({
    method: 'PUT',
    url: `https://fswdi-api-todos.herokuapp.com/api/todos/${values.id}`,
    data: values
  }).then((resp) => {
    dispatch(actions.editTodo(resp.data.todo))
    resolve(resp)
  }).catch((err) => {
    reject(err)
  })),
  deleteTodo: (TodoId) => new Promise((resolve, reject) => axios({
    method: 'DELETE',
    url: `https://fswdi-api-todos.herokuapp.com/api/todos/${TodoId}`
  })
    .then((resp) => {
      resolve(resp)
    })
    .catch((err) => {
      reject(err)
    })),
  editItem: (values) => new Promise((resolve, reject) => axios({
    method: 'PUT',
    url: `https://fswdi-api-todos.herokuapp.com/api/todos/${values.id}/todo-items/${itemId}`,
    data: values
  }).then((resp) => {
    dispatch(actions.editItem(resp.data))
    resolve(resp)
  }).catch((err) => {
    dispatch(actions.editItem({ todoItem: null }))
    reject(err)
  }))
})

const initialState = {
  meta: null,
  index: undefined,
  show: undefined
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'setTodos': {
      return produce(state, (draft) => {
        draft.meta = action.payload.meta
        draft.index = action.payload.todos
      })
    }
    case 'unsetTodos': {
      return produce(state, (draft) => {
        draft.meta = null
        draft.index = undefined
      })
    }
    case 'setTodo': {
      return produce(state, (draft) => {
        draft.show = action.payload
      })
    }
    case 'unsetTodo': {
      return produce(state, (draft) => {
        draft.show = undefined
      })
    }
    case 'addItemTodo': {
      return produce(state, (draft) => {
        draft.show.todo.TodoItems.push(action.payload.todoItem)
      })
    }
    case 'editTodo': {
      return produce(state, (draft) => {
        draft.show.todo = action.payload
      })
    }
    case 'editItem': {
      return produce(state, (draft) => {
        const foundIndex = draft.show.todo.TodoItems.findIndex(
          (item) => item.id === action.payload.todoItem.id
        )
        if (foundIndex !== -1) {
          draft.show.todo.TodoItems[foundIndex] = action.payload.todoItem
        }
      })
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const TodosContext = createContext()
const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, initialState)
  return <TodosContext.Provider value={{ todos, dispatch }}>{children}</TodosContext.Provider>
}
TodosProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export { TodosProvider, api }
export default TodosContext
