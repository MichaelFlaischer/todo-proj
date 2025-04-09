const { useEffect, useState } = React
const { useNavigate, useParams } = ReactRouter

import { todoService } from '../services/todo.service.js'
import { saveTodo } from '../store/actions/todo.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function TodoEdit() {
  const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (params.todoId) loadTodo()
  }, [])

  function loadTodo() {
    todoService
      .get(params.todoId)
      .then(setTodoToEdit)
      .catch((err) => console.error('err:', err))
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break
      case 'checkbox':
        value = target.checked
        break
      default:
        break
    }

    setTodoToEdit((prevTodo) => ({ ...prevTodo, [field]: value }))
  }

  function onSaveTodo(ev) {
    ev.preventDefault()
    saveTodo(todoToEdit)
      .then((savedTodo) => {
        navigate('/todo')
        showSuccessMsg(`Todo Saved (id: ${savedTodo._id})`)
      })
      .catch((err) => {
        console.error('err:', err)
        showErrorMsg('Cannot save todo')
      })
  }

  const { txt, importance, isDone } = todoToEdit

  return (
    <section className='todo-edit'>
      <form onSubmit={onSaveTodo}>
        <label htmlFor='txt'>Text:</label>
        <input onChange={handleChange} value={txt} type='text' name='txt' id='txt' />

        <label htmlFor='importance'>Importance:</label>
        <input onChange={handleChange} value={importance} type='number' name='importance' id='importance' />

        <label htmlFor='isDone'>isDone:</label>
        <input onChange={handleChange} checked={isDone} type='checkbox' name='isDone' id='isDone' />

        <button>Save</button>
      </form>
    </section>
  )
}
