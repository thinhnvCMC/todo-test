import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import TodosContext, { api } from '@/contexts/Todos'
import Loading from '@/components/Loading'

class PagesTodosShow extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params
    const { getTodo } = api(this.context.dispatch)
    getTodo(id)
  }

  componentWillUnmount() {
    const { resetTodo } = api(this.context.dispatch)
    resetTodo()
  }

  renderShow() {
    const { show } = this.context.todos

    if (show === undefined) return <Loading />
    if (show === null) return <h2>Not Found</h2>
    return (
      <>
        <h2 className="my-3">{ show.id } | { show.title }</h2>
        <div className="list-group">
          {
            show.TodoItems.map((item) => (
              <div
                key={item.id}
                className={`list-group-item list-group-item-action ${item.checked ? 'text-decoration-through' : ''}`}
              >
                {item.name}
              </div>
            ))
          }
        </div>
      </>
    )
  }

  render() {
    return (
      <div id="pages-todos-show" className="container">
        <header className="text-center border-bottom">
          <h1>Todo Show Page</h1>
          <div>
            <Link to="/">Home Page</Link>
            <span> | </span>
            <Link to="/todos">Todos Page</Link>
          </div>
        </header>
        <main className="text-center mt-3">
          { this.renderShow() }
        </main>
      </div>
    )
  }
}

PagesTodosShow.contextType = TodosContext
PagesTodosShow.propTypes = {
  match: PropTypes.shape().isRequired
}

export default PagesTodosShow
