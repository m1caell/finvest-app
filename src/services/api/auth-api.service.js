import { useRequest } from './request.service'

const useAuthApi = () => {
  const { callPost } = useRequest()

  const doLogin = async ({ email, password }) => {
    try {
      const result = await callPost({
        url: '/login',
        data: { email, password }
      })

      return result.data
    } catch (error) {
      return null
    }
  }

  return { doLogin }
}

export { useAuthApi }
