import { userService } from '../services/user.service.js'

const { createStore, compose } = Redux

//* Todos
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_FILTER_BY = 'SET_FILTER_BY'

//* User
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'

const initialState = {
  todo: [],
  allTodos: [],
  filterBy: {
    txt: '',
    importance: 0,
    status: 'all',
  },
  loggedInUser: userService.getLoggedinUser(),
}

function appReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    //* Todo
    case SET_TODOS: {
      const updatedTodos = cmd.todo
      const shouldUpdateAllTodos = !state.allTodos.length
      return {
        ...state,
        todo: updatedTodos,
        allTodos: shouldUpdateAllTodos ? updatedTodos : state.allTodos,
      }
    }

    case REMOVE_TODO: {
      const updatedTodos = state.todo.filter((todo) => todo._id !== cmd.todoId)
      const updatedAllTodos = state.allTodos.filter((todo) => todo._id !== cmd.todoId)
      return {
        ...state,
        todo: updatedTodos,
        allTodos: updatedAllTodos,
      }
    }

    case ADD_TODO: {
      const updatedTodos = [...state.todo, cmd.todo]
      const updatedAllTodos = [...state.allTodos, cmd.todo]
      return {
        ...state,
        todo: updatedTodos,
        allTodos: updatedAllTodos,
      }
    }

    case UPDATE_TODO: {
      const prevTodo = state.todo.find((t) => t._id === cmd.todo._id)
      const isGainedPoint = prevTodo && !prevTodo.isDone && cmd.todo.isDone

      const updatedTodos = state.todo.map((todo) => (todo._id === cmd.todo._id ? cmd.todo : todo))
      const updatedAllTodos = state.allTodos.map((todo) => (todo._id === cmd.todo._id ? cmd.todo : todo))

      let updatedUser = state.loggedInUser
      if (isGainedPoint && updatedUser) {
        updatedUser = {
          ...updatedUser,
          balance: (updatedUser.balance || 0) + 10,
        }
      }

      return {
        ...state,
        todo: updatedTodos,
        allTodos: updatedAllTodos,
        loggedInUser: updatedUser,
      }
    }

    //* Filter
    case SET_FILTER_BY:
      return {
        ...state,
        filterBy: { ...cmd.filterBy },
      }

    //* User
    case SET_USER:
      return {
        ...state,
        loggedInUser: cmd.user,
      }

    case SET_USER_SCORE:
      const loggedInUser = { ...state.loggedInUser, score: cmd.score }
      return { ...state, loggedInUser }

    case SET_USER_BALANCE:
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          balance: cmd.balance,
        },
      }

    default:
      return state
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(appReducer, composeEnhancers())

// * For Debugging
window.gStore = store
