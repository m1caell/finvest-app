import createGlobalState from 'react-create-global-state'
import { User } from '@models'

const [useGlobalAuthProvider, AuthProvider] = createGlobalState()

const USER_MOCK = {
  name: 'Nome Completo',
  email: 'test@test.com.br',
  type: 'ANALYST', // ANALYST || CUSTOMER
  token: 'dfjalsdfkjwqlkj4352452345ladjkfklasjdf'
}

const LS_LOGGED_USER_NAME = 'loggedUser'
const useAuthService = () => {
  const [auth, setAuth] = useGlobalAuthProvider()

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
    // TODO: criar lógica do usuário quando API entregar essa info, adicionar data para criar user
    const user = new User(USER_MOCK)
    saveLoggedUserInLocalStorage(user)
    setAuth(user)

    return user
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
    signin,
    signout
  }
}

export { useAuthService, AuthProvider }
