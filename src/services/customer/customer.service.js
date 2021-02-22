import { useState } from 'react'
import { useCustomerApi } from '@services/api/customer-api.service'
import { useAuthService } from '@services/auth/auth.service'

const useCustomerService = () => {
  const [error, setError] = useState(null)

  const { authorization } = useAuthService()

  const { createCustomer, getAll, updateCustomerData } = useCustomerApi({
    authorization
  })

  const createNewCustomer = async customerModel => {
    if (validate(customerModel) && validateCpf({ cpf: customerModel?.cpf })) {
      customerModel.cpf = customerModel.cpf.replace(/[^0-9]/g, '')

      return await createCustomer(customerModel)
    }
  }

  const getAllCustomers = async () => {
    return await getAll()
  }

  const confirmFirstUserData = async userConfirmData => {
    if (validate(userConfirmData)) {
      return await updateCustomerData(userConfirmData)
    }
  }

  const validateCpf = ({ cpf }) => {
    if (!cpf) {
      setError('CPF é obrigatório.')
      return false
    }

    if (cpf.length < 10) {
      setError('CPF inválido.')
      return false
    }

    return true
  }

  const validate = ({ fullName, email }) => {
    if (!fullName) {
      setError('Nome completo é obrigatório.')
      return false
    }

    const qntWords = fullName.split(' ')

    if (qntWords.length < 2) {
      setError('Nome completo deve conter no mínimo duas palavras')
      return false
    }

    if (!email) {
      setError('Email é obrigatório.')
      return false
    }

    const emailValidation = RegExp(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'g')

    if (!emailValidation.test(email)) {
      setError('Email é inválido.')
      return false
    }

    setError(null)
    return true
  }

  return {
    createNewCustomer,
    customerError: error,
    getAllCustomers,
    confirmFirstUserData
  }
}

export { useCustomerService }
