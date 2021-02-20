import { useState } from 'react'
import { useCustomerApi } from '@services/api/customer-api.service'
import { useAuthService } from '@services/auth/auth.service'

const useCustomerService = () => {
  const [error, setError] = useState(null)

  const { authorization } = useAuthService()

  const { createCustomer, getAll } = useCustomerApi({ authorization })

  const createNewCustomer = async customerModel => {
    if (validate(customerModel)) {
      customerModel.cpf = customerModel.cpf.replace(/[^0-9]/g, '')

      return await createCustomer(customerModel)
    }
  }

  const getAllCustomers = async () => {
    return await getAll()
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

    if (cpf.length < 10) {
      setError('CPF inválido.')
      return false
    }

    if (!password) {
      setError('Pré-senha é obrigatório.')
      return false
    }

    if (password.length < 7) {
      setError('Pré-senha deve conter no mínimo 8 caracteres.')
      return false
    }

    setError(null)
    return true
  }

  return { createNewCustomer, error, getAllCustomers }
}

export { useCustomerService }
