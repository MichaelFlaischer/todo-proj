import { storageService } from './async-storage.service.js'

export const userService = {
  getLoggedinUser,
  login,
  logout,
  signup,
  getById,
  query,
  getEmptyCredentials,
  addActivity,
  updateBalance,
  updateUser,
}

const STORAGE_KEY_LOGGEDIN = 'user'
const STORAGE_KEY = 'userDB'

function query() {
  return storageService.query(STORAGE_KEY)
}

function getById(userId) {
  return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
  return storageService.query(STORAGE_KEY).then((users) => {
    const user = users.find((user) => user.username === username && user.password === password)
    if (user) {
      if (user.balance === undefined) user.balance = 0
      if (!user.activities) user.activities = []
      if (!user.color) user.color = '#ffffff'
      if (!user.bgColor) user.bgColor = '#000000'
      return _setLoggedinUser(user)
    } else {
      return Promise.reject('Invalid login')
    }
  })
}

function signup({ username, password, fullname, color = '#ffffff', bgColor = '#000000' }) {
  const user = {
    username,
    password,
    fullname,
    balance: 0,
    activities: [],
    color,
    bgColor,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }

  return storageService.post(STORAGE_KEY, user).then(_setLoggedinUser)
}

function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
  return Promise.resolve()
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    balance: user.balance || 0,
    activities: user.activities || [],
    color: user.color || '#ffffff',
    bgColor: user.bgColor || '#000000',
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
  return userToSave
}

function getEmptyCredentials() {
  return {
    fullname: '',
    username: 'muki',
    password: 'muki1',
  }
}

function addActivity(txt) {
  const loggedinUser = getLoggedinUser()
  if (!loggedinUser) return Promise.reject('Not logged in')

  return getById(loggedinUser._id)
    .then((user) => {
      user.activities = user.activities || []
      user.activities.unshift({
        txt,
        at: Date.now(),
      })
      user.updatedAt = Date.now()

      return storageService.put(STORAGE_KEY, user)
    })
    .then(_setLoggedinUser)
}

function updateBalance(diff) {
  const loggedinUser = getLoggedinUser()
  if (!loggedinUser) return Promise.reject('Not logged in')

  return getById(loggedinUser._id)
    .then((user) => {
      user.balance = (user.balance || 0) + diff
      user.updatedAt = Date.now()
      return storageService.put(STORAGE_KEY, user)
    })
    .then(_setLoggedinUser)
    .then((user) => user.balance)
}

function updateUser(updatedUser) {
  updatedUser.updatedAt = Date.now()
  return storageService.put(STORAGE_KEY, updatedUser).then(_setLoggedinUser)
}
