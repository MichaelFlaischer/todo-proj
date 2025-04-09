const { useState } = React

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { login, signup } from '../store/actions/user.actions.js'

export function LoginSignup() {
  const [isSignup, setIsSignUp] = useState(false)
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

  function handleChange({ target }) {
    const { name: field, value } = target
    setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    isSignup ? onSignup(credentials) : onLogin(credentials)
  }

  function onLogin(credentials) {
    login(credentials)
      .then(() => showSuccessMsg('Logged in successfully'))
      .catch(() => showErrorMsg('Oops try again'))
  }

  function onSignup(credentials) {
    signup(credentials)
      .then(() => showSuccessMsg('Signed up successfully'))
      .catch(() => showErrorMsg('Oops try again'))
  }

  return (
    <div className='login-page'>
      <form className='login-form' onSubmit={handleSubmit}>
        <input type='text' name='username' value={credentials.username} placeholder='Username' onChange={handleChange} required autoFocus />
        <input type='password' name='password' value={credentials.password} placeholder='Password' onChange={handleChange} required autoComplete='off' />
        {isSignup && <input type='text' name='fullname' value={credentials.fullname} placeholder='Full name' onChange={handleChange} required />}
        <button>{isSignup ? 'Signup' : 'Login'}</button>
      </form>

      <div className='btns'>
        <a href='#' onClick={() => setIsSignUp(!isSignup)}>
          {isSignup ? 'Already a member? Login' : 'New user? Signup here'}
        </a>
      </div>
    </div>
  )
}
