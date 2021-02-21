import createGlobalState from 'react-create-global-state'
import { useAuthApi } from '../api/auth-api.service'
import { User } from '@models'

const [useGlobalAuthProvider, AuthProvider] = createGlobalState()

const LS_LOGGED_USER_NAME = 'loggedUser'
const useAuthService = () => {
  const [auth, setAuth] = useGlobalAuthProvider()

  const { doLogin } = useAuthApi()

  const saveLoggedUserInLocalStorage = user => {
    localStorage.setItem(LS_LOGGED_USER_NAME, JSON.stringify(user))
  }

  const removeLoggedUserInLocalStorage = () => {
    localStorage.removeItem(LS_LOGGED_USER_NAME)
  }

  const getLoggedUserInLocalStorage = () => {
    return localStorage.getItem(LS_LOGGED_USER_NAME)
  }

  const signin = async ({ email, password }) => {
    if (email || password) {
      const result = await doLogin({ email, password })

      if (result?.data) {
        const user = new User(result.data)
        saveLoggedUserInLocalStorage(user)
        setAuth(user)

        return user
      }
    }
  }

  const updateLoggedUser = user => {
    if (user) {
      saveLoggedUserInLocalStorage(user)
      setAuth(user)
    }
  }

  const signout = () => {
    setAuth(null)
    removeLoggedUserInLocalStorage()
  }

  const getLoggedUser = () => {
    const user = getLoggedUserInLocalStorage()

    if (auth) {
      return auth
    }

    if (user) {
      return new User(JSON.parse(user))
    }

    return null
  }

  return {
    loggedUser: getLoggedUser(),
    authorization: getLoggedUser()?.token,
    updateLoggedUser,
    signin,
    signout
  }
}

export { useAuthService, AuthProvider }
