const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector } = ReactRedux

import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { logout } from '../store/actions/user.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function AppHeader() {
  const navigate = useNavigate()
  const user = useSelector((storeState) => storeState.loggedInUser)
  const allTodos = useSelector((storeState) => storeState.allTodos)

  function onLogout() {
    logout()
      .then(() => navigate('/'))
      .catch(() => showErrorMsg('Oops, try again'))
  }

  const totalTodos = allTodos.length
  const doneCount = allTodos.filter((todo) => todo.isDone).length
  const percentage = totalTodos ? Math.round((doneCount / totalTodos) * 100) : 0

  return (
    <header className='app-header full main-layout'>
      <section className='header-container'>
        <h1>React Todo App</h1>
      </section>

      {user ? (
        <section className='user-section'>
          <div className='todo-progress'>
            ✅ {doneCount} / {totalTodos} done ({percentage}%)
          </div>
          <Link to={`/user/${user._id}`}>
            Hello {user.fullname} (💰 {user.balance || 0})
          </Link>
          <button onClick={onLogout}>Logout</button>
        </section>
      ) : (
        <section>
          <LoginSignup />
        </section>
      )}

      <section>
        <nav className='app-nav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/todo'>Todos</NavLink>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </nav>
      </section>

      <UserMsg />
    </header>
  )
}
