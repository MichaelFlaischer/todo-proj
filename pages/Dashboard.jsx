const { useEffect, useState } = React
const { useSelector } = ReactRedux

import { Chart } from '../cmps/Chart.jsx'
import { todoService } from '../services/todo.service.js'
import { loadTodos } from '../store/actions/todo.actions.js'

export function Dashboard() {
  const todos = useSelector((storeState) => storeState.todo)
  const [importanceStats, setImportanceStats] = useState([])

  useEffect(() => {
    if (!todos.length) loadTodos()
    todoService
      .getImportanceStats()
      .then(setImportanceStats)
      .catch((err) => console.error('Failed to load stats', err))
  }, [])

  return (
    <section className='dashboard'>
      <h1>Dashboard</h1>
      <h2>Statistics for {todos.length} Todos</h2>
      <hr />
      <h4>By Importance</h4>
      <Chart data={importanceStats} />
    </section>
  )
}
