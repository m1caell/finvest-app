import { useState } from 'react'

const useValidateService = () => {
  const [error, setError] = useState(null)

  const validateCpf = cpf => {
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

  const validateRg = identity => {
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

  const validatePassword = password => {
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

  const validateFullName = fullName => {
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
  const validateEmail = email => {
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

  const validateAddress = address => {
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
  const validatePhone = phone => {
    if (!phone) {
      setError('Telefone inválido')
      return false
    }

    if (phone.length <= 11 && phone.length > 13 && phone.length === 0) {
      setError('Digite um número de telefone válido')
      return false
    }
    return true
  }

  return {
    validate: error,
    validateAddress,
    validateEmail,
    validatePhone,
    validateFullName,
    validatePassword,
    validateRg,
    validateCpf
  }
}

export { useValidateService }
