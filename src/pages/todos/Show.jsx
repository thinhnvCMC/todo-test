import Loading from '@/components/Loading'
import TodosContext, { api } from '@/contexts/Todos'
import ModalsTodosCreate from '@/modals/todos/Create'
import ModalsTodosUpdate from '@/modals/todos/Update'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'


class PagesTodosShow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showModalsTodosAddItem: false,
      showModalsTodosEdit: false,
    }

    this.toggleModalsTodosAddItem = this.toggleModalsTodosAddItem.bind(this);
    this.toggleModalsTodosEdit = this.toggleModalsTodosEdit.bind(this);
    this.handleAddItemSubmit = this.handleAddItemSubmit.bind(this);
    this.handleEditTodo = this.handleEditTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const { getTodo } = api(this.context.dispatch)
    getTodo(id)
  }

  componentWillUnmount() {
    const { resetTodo } = api(this.context.dispatch)
    resetTodo()
  }

  toggleModalsTodosAddItem() {
    this.setState({ showModalsTodosAddItem: !this.state.showModalsTodosAddItem })
  }

  toggleModalsTodosEdit() {
    this.setState({ showModalsTodosEdit: !this.state.showModalsTodosEdit })
  }

  

  handleAddItemSubmit(values) {
    const { addItem } = api(this.context.dispatch)
    addItem(values).then((resp) => {
      this.setState({ showModalsTodosAddItem: false });
      console.log(resp);
    })
  }

  handleEditTodo(values) {
    const { editTodo } = api(this.context.dispatch)
    editTodo(values).then(() => {
      this.setState({ showModalsTodosEdit: false })
    }).catch((err) => {
      console.log(err)
    })
  }

   handleDeleteTodo() {
    const { id } = this.props.match.params
    try {
      const { deleteTodo } = api(this.context.dispatch);
      deleteTodo(id)
        .then(() => {
          const { history } = this.props
          history.replace('/todos')
        })
        .catch((err) => {
          alert(err)
        })
    } catch (error) {
      console.log(error);
    }
  }

  handleEditItem(values) {
    const { id } = this.props.match.params
    const { editItem } = api(this.context.dispatch);

    try {
      console.log(values);
      // editItem(values)
    } catch (error) {
      
    }
  }

  renderShow() {
    const { showModalsTodosAddItem, showModalsTodosEdit } = this.state;
    const { show } = this.context.todos

    if (show === undefined) return <Loading />
    if (show === null) return <h2>Not Found</h2>
    let todo;
    if(show !== undefined && show) {
      todo = show.todo;
    }

    return (
      todo && (
        <>
          <h2 className="my-3">{ todo.id } | { todo.title }</h2>
          <div className="list-group">
            {
              todo.TodoItems?.map((item) => (
                <div
                  key={item.id}
                  className={`list-group-item list-group-item-action ${item.checked ? 'text-decoration-through' : ''}`}
                >
                  {item.name}
                </div>
              ))
            }
            <button className="btn btn-primary mb-3" type="button" onClick={this.toggleModalsTodosAddItem}>Add Item</button>
            { showModalsTodosAddItem && 
              <ModalsTodosUpdate todoId={todo.id} todoTitle={todo.title} close={this.toggleModalsTodosAddItem} onSubmit={this.handleAddItemSubmit} />
            }

            <button className="btn btn-success mb-3" type="button" onClick={this.toggleModalsTodosEdit}>Edit Todo</button>
            { showModalsTodosEdit && <ModalsTodosUpdate isEditTodo initialValuesUpdate={todo} close={this.toggleModalsTodosEdit} onSubmit={this.handleEditTodo} />}

            <button className="btn btn-danger mb-3" type="button" onClick={this.handleDeleteTodo}>Delete this todo</button>

          </div>
        </>
        )
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
