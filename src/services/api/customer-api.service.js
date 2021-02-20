import { useRequest } from './request.service'

const useCustomerApi = ({ authorization }) => {
  const { callPost } = useRequest({ authorization })

  const createCustomer = async customerModel => {
    try {
      const result = await callPost({
        url: '/user',
        data: customerModel
      })

      return result.data
    } catch (error) {
      return null
    }
  }

  return { createCustomer }
}

export { useCustomerApi }
