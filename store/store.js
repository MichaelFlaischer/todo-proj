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

const initialState = {
  todo: [],
  filterBy: {
    txt: '',
    importance: 0,
  },
  loggedInUser: userService.getLoggedinUser(),
  selectedTodo: null,
}

function appReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    //* Todo
    case SET_TODOS:
      return {
        ...state,
        todo: cmd.todo,
        countTodos: cmd.todo.length,
      }
    case REMOVE_TODO: {
      const updatedTodos = state.todo.filter((todo) => todo._id !== cmd.todoId)
      return {
        ...state,
        todo: updatedTodos,
        countTodos: updatedTodos.length,
      }
    }
    case ADD_TODO: {
      const updatedTodos = [...state.todo, cmd.todo]
      return {
        ...state,
        todo: updatedTodos,
        countTodos: updatedTodos.length,
      }
    }
    case UPDATE_TODO:
      return {
        ...state,
        todo: state.todo.map((todo) => (todo._id === cmd.todo._id ? cmd.todo : todo)),
      }

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

    default:
      return state
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(appReducer, composeEnhancers())

// * For Debugging
window.gStore = store
