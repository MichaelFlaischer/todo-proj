const { useEffect, useState } = React
const { useNavigate, useParams } = ReactRouter

import { todoService } from '../services/todo.service.js'
import { removeTodo } from '../store/actions/todo.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function TodoDeleteConfirm() {
  const { todoId } = useParams()
  const navigate = useNavigate()

  const [todo, setTodo] = useState(null)

  useEffect(() => {
    todoService
      .get(todoId)
      .then(setTodo)
      .catch((err) => {
        console.error('Error loading todo:', err)
        showErrorMsg('Failed to load todo')
        navigate('/todo')
      })
  }, [todoId])

  function onConfirmDelete() {
    removeTodo(todoId)
      .then(() => {
        showSuccessMsg('Todo deleted successfully')
        navigate('/todo')
      })
      .catch((err) => {
        console.error('Error deleting todo:', err)
        showErrorMsg('Failed to delete todo')
      })
  }

  function onCancel() {
    navigate('/todo')
  }

  if (!todo) return <div>Loading...</div>

  return (
    <section className='todo-delete-confirm'>
      <h2>Are you sure you want to delete this todo?</h2>
      <h3>"{todo.txt}"</h3>
      <button onClick={onConfirmDelete}>Yes, delete</button>
      <button onClick={onCancel}>Cancel</button>
    </section>
  )
}
