import { useState } from 'react'
import { useCustomerApi } from '@services/api/customer-api.service'

const useCustomerService = () => {
  const [error, setError] = useState(null)

  const { createCustomer } = useCustomerApi()

  const createNewCustomer = async customerModel => {
    if (validate(customerModel)) {
      const result = await createCustomer()

      return result
    }
  }

  const validate = ({ fullName, email, cpf, password }) => {
    if (!fullName) {
      setError('Nome completo é obrigatório.')
      return false
    }

    if (!email) {
      setError('Email é obrigatório.')
      return false
    }

    if (!cpf) {
      setError('CPF é obrigatório.')
      return false
    }

    if (!password) {
      setError('Pré-senha é obrigatório.')
      return false
    }

    setError(null)
    return true
  }

  return { createNewCustomer, error }
}

export { useCustomerService }
