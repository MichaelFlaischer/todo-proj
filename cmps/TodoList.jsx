import { TodoPreview } from './TodoPreview.jsx'
const { Link } = ReactRouterDOM

export function TodoList({ todos, onToggleTodo }) {
  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <li key={todo._id}>
          <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} />
          <section>
            <Link to={`/todo/delete/${todo._id}`}>
              <button>Delete</button>
            </Link>
            <Link to={`/todo/${todo._id}`}>
              <button>Details</button>
            </Link>
            <Link to={`/todo/edit/${todo._id}`}>
              <button>Edit</button>
            </Link>
          </section>
        </li>
      ))}
    </ul>
  )
}
