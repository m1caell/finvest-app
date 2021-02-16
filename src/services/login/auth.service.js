import createGlobalState from 'react-create-global-state'

const [useGlobalAuthProvider, AuthProvider] = createGlobalState()

const useAuthService = () => {
  const [auth, setAuth] = useGlobalAuthProvider()

  const signin = user => {
    // TODO: criar lógica do usuário quando API entregar essa info
    const fakeResult = { user: true }
    setAuth(fakeResult)
  }

  const signout = () => {
    setAuth(null)
  }

  return {
    auth,
    signin,
    signout
  }
}

export { useAuthService, AuthProvider }
