import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import TodosContext, { api } from '@/contexts/Todos'
import ModalsTodosCreate from '@/modals/todos/Create'
import Loading from '@/components/Loading'

class PagesTodosIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showModalsTodosCreate: false
    }

    this.handleCreateSubmit = this.handleCreateSubmit.bind(this)
    this.openModalsTodosCreate = this.openModalsTodosCreate.bind(this)
    this.closeModalsTodosCreate = this.closeModalsTodosCreate.bind(this)
  }

  componentDidMount() {
    const { getTodos } = api(this.context.dispatch)
    getTodos()
  }

  componentWillUnmount() {
    const { resetTodos } = api(this.context.dispatch)
    resetTodos()
  }

  handleCreateSubmit(values) {
    const { createTodo } = api(this.context.dispatch)
    createTodo(values).then((resp) => {
      const { history: { replace } } = this.props
      replace(`/todos/${resp.data.todo.id}`)
    })
  }

  openModalsTodosCreate() {
    this.setState({ showModalsTodosCreate: true })
  }

  closeModalsTodosCreate() {
    this.setState({ showModalsTodosCreate: false })
  }

  renderIndex() {
    const { index } = this.context.todos

    if (index === undefined) return <Loading />
    if (index.length === 0) return <h2>No Todos</h2>
    return (
      <div className="list-group">
        {
          index.map((item) => (
            <Link
              key={item.id}
              to={`/todos/${item.id}`}
              className="list-group-item list-group-item-action"
            >
              {item.title}
            </Link>
          ))
        }
      </div>
    )
  }

  render() {
    const { showModalsTodosCreate } = this.state

    return (
      <div id="pages-todos-index" className="container">
        <header className="text-center border-bottom">
          <h1>Todos Index Page</h1>
          <div><Link to="/">Home Page</Link></div>
        </header>
        <main className="text-center mt-3">
          <button className="btn btn-success mb-3" type="button" onClick={this.openModalsTodosCreate}>New</button>
          { this.renderIndex() }
        </main>

        { showModalsTodosCreate && <ModalsTodosCreate close={this.closeModalsTodosCreate} onSubmit={this.handleCreateSubmit} />}
      </div>
    )
  }
}

PagesTodosIndex.contextType = TodosContext
PagesTodosIndex.propTypes = {
  history: PropTypes.shape().isRequired
}

export default PagesTodosIndex
