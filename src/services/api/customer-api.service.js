import { useRequest } from './request.service'

const useCustomerApi = () => {
  const { callPost } = useRequest()

  const createCustomer = async customerModel => {
    try {
      const result = await callPost({
        url: '/customer',
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
