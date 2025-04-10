const { useEffect, useState } = React
const { useSelector } = ReactRedux
const { Link, useSearchParams } = ReactRouterDOM

import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { DataTable } from '../cmps/data-table/DataTable.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadTodos, saveTodo } from '../store/actions/todo.actions.js'

export function TodoIndex() {
  const todos = useSelector((storeState) => storeState.todo)
  const filterBy = useSelector((storeState) => storeState.filterBy)

  const [searchParams, setSearchParams] = useSearchParams()
  const [isTableView, setIsTableView] = useState(false)

  useEffect(() => {
    setSearchParams(filterBy)
    loadTodos(filterBy).catch((err) => {
      console.error('err:', err)
      showErrorMsg('Cannot load todos')
    })
  }, [filterBy])

  function onToggleTodo(todo) {
    const todoToSave = { ...todo, isDone: !todo.isDone }
    saveTodo(todoToSave)
      .then(() => showSuccessMsg(`Todo is ${todoToSave.isDone ? 'done' : 'back on your list'}`))
      .catch((err) => {
        console.error('err:', err)
        showErrorMsg('Cannot toggle todo ' + todo._id)
      })
  }

  if (!todos) return <div>Loading...</div>

  return (
    <section className='todo-index'>
      <TodoFilter />
      <div className='todo-actions'>
        <Link to='/todo/edit' className='btn'>
          Add Todo
        </Link>
        <button onClick={() => setIsTableView((prev) => !prev)} className='btn'>
          {isTableView ? 'Show List View' : 'Show Table View'}
        </button>
      </div>

      {todos.length === 0 ? (
        <h2>No todos to show...</h2>
      ) : (
        <React.Fragment>
          {isTableView ? (
            <React.Fragment>
              <h2>Todos Table</h2>
              <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} />
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h2>Todos List</h2>
              <TodoList todos={todos} onToggleTodo={onToggleTodo} />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </section>
  )
}
