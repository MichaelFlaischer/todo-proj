import { userService } from '../../services/user.service.js'
import { SET_USER, store } from '../store.js'

export function login(credentials) {
  return userService
    .login(credentials)
    .then((user) => {
      return userService.getById(user._id)
    })
    .then((updatedUser) => {
      store.dispatch({ type: SET_USER, user: updatedUser })
      return updatedUser
    })
    .catch((err) => {
      console.log('user actions -> Cannot login', err)
      throw err
    })
}

export function signup(credentials) {
  return userService
    .signup(credentials)
    .then((user) => {
      return userService.getById(user._id)
    })
    .then((updatedUser) => {
      store.dispatch({ type: SET_USER, user: updatedUser })
      return updatedUser
    })
    .catch((err) => {
      console.log('user actions -> Cannot signup', err)
      throw err
    })
}

export function updateUser(updatedFields) {
  return userService
    .updateUser(updatedFields)
    .then((updatedUser) => {
      store.dispatch({ type: SET_USER, user: updatedUser })
      return updatedUser
    })
    .catch((err) => {
      console.log('user actions -> Cannot update user', err)
      throw err
    })
}

export function logout() {
  return userService
    .logout()
    .then(() => {
      store.dispatch({ type: SET_USER, user: null })
    })
    .catch((err) => {
      console.log('user actions -> Cannot logout', err)
      throw err
    })
}
