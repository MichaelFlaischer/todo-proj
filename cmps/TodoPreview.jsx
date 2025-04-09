export function TodoPreview({ todo, onToggleTodo }) {
  return (
    <article className='todo-preview'>
      <div className='header-row'>
        <span className='color-indicator' title={`Color: ${todo.color}`} style={{ backgroundColor: todo.color }}></span>

        <h2 className={todo.isDone ? 'done' : ''} onClick={onToggleTodo}>
          Todo: {todo.txt}
        </h2>
      </div>

      <h4>Todo Importance: {todo.importance}</h4>
      <img src={`../assets/img/todo.png`} alt='' />
    </article>
  )
}
