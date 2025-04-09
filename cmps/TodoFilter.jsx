const { useState, useEffect } = React
const { useSelector } = ReactRedux
import { setFilterBy } from '../store/actions/todo.actions.js'

export function TodoFilter() {
  const filterBy = useSelector((storeState) => storeState.filterBy)

  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    setFilterBy(filterByToEdit)
  }, [filterByToEdit])

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

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  // Optional: for lazy filtering with a button (currently unused)
  function onSubmitFilter(ev) {
    ev.preventDefault()
    setFilterBy(filterByToEdit)
  }

  const { txt, importance } = filterByToEdit

  return (
    <section className='todo-filter'>
      <h2>Filter Todos</h2>
      <form onSubmit={onSubmitFilter}>
        <input value={txt} onChange={handleChange} type='search' placeholder='By Txt' id='txt' name='txt' />
        <label htmlFor='importance'>Importance: </label>
        <input value={importance} onChange={handleChange} type='number' placeholder='By Importance' id='importance' name='importance' />

        <button hidden>Set Filter</button>
      </form>
    </section>
  )
}
