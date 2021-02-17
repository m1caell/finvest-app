import { useState } from 'react'
import { useAuthService } from '@services/index'
import { useHistory } from 'react-router-dom'

const useLoginPage = () => {
  const [error, setError] = useState(null)
  const { signin } = useAuthService()
  const history = useHistory()

  const doLogin = async ({ email, password }) => {
    const result = await signin({ email, password })

    if (result) {
      history.push('/home')
    } else {
      setError('Email ou senha incorretos.')
    }
  }

  return {
    doLogin,
    error
  }
}

export { useLoginPage }
