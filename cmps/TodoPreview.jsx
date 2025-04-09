export function TodoPreview({ todo, onToggleTodo }) {
  return (
    <article className='todo-preview'>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
        <span
          title={`Color: ${todo.color}`}
          style={{
            backgroundColor: todo.color,
            width: '1em',
            height: '1em',
            borderRadius: '50%',
            display: 'inline-block',
            border: '1px solid #ccc',
          }}
        ></span>

        <h2 className={todo.isDone ? 'done' : ''} onClick={onToggleTodo}>
          Todo: {todo.txt}
        </h2>
      </div>

      <h4>Todo Importance: {todo.importance}</h4>
      <img src={`../assets/img/todo.png`} alt='' />
    </article>
  )
}
