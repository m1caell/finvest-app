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
    if (
      validateFullName(customerModel) &&
      validateEmail(customerModel) &&
      validateCpf(customerModel) &&
      validateAddress(customerModel) &&
      validateRg(customerModel)
    ) {
      customerModel.cpf = customerModel.cpf.replace(/[^0-9]/g, '')
      customerModel.identity = customerModel.identity.replace(/[^0-9]/g, '')

      return await createCustomer(customerModel)
    }
  }

  const getAllCustomers = async () => {
    return await getAll()
  }

  const confirmFirstUserData = async userConfirmData => {
    if (
      validateFullName(userConfirmData) &&
      validateEmail(userConfirmData) &&
      validatePassword(userConfirmData)
    ) {
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

  const validateRg = ({ identity }) => {
    if (!identity) {
      setError('RG é obrigatório.')
      return false
    }

    if (identity.length < 9) {
      setError('RG inválido.')
      return false
    }

    return true
  }

  const validatePassword = ({ password }) => {
    if (!password) {
      setError('Senha é obrigatória.')
      return false
    }

    if (password.length < 7) {
      setError('Senha deve conter no mínimo 8 caracteres.')
      return false
    }

    return true
  }

  const validateFullName = ({ fullName }) => {
    if (!fullName) {
      setError('Nome completo é obrigatório.')
      return false
    }

    const qntWords = fullName.split(' ')

    if (qntWords.length < 2) {
      setError('Nome completo deve conter no mínimo duas palavras')
      return false
    }

    return true
  }
  const validateEmail = ({ email }) => {
    if (!email) {
      setError('Email é obrigatório.')
      return false
    }

    const emailValidation = RegExp(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'g')

    if (!emailValidation.test(email)) {
      setError('Email é inválido.')
      return false
    }
    return true
  }

  const validateAddress = ({ address }) => {
    if (!address) {
      setError('Endereço completo é obrigatório.')
      return false
    }

    const qntWords = address.split(' ')

    if (qntWords.length < 3) {
      setError('Enderço completo deve conter no mínimo três palavras')
      return false
    }
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
