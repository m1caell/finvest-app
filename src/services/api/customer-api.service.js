import { useRequest } from './request.service'

const useCustomerApi = ({ authorization }) => {
  const { callPost, callGet } = useRequest({ authorization })

  const createCustomer = async customerModel => {
    try {
      const result = await callPost({
        url: '/user',
        data: customerModel
      })

      return result.data
    } catch (error) {
      console.error(error)
    }
  }

  const getAll = async () => {
    try {
      const result = await callGet({
        url: '/user/list'
      })

      return result.data
    } catch (error) {
      console.error(error)
    }
  }

  return { createCustomer, getAll }
}

export { useCustomerApi }
