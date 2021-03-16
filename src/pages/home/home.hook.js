import { useState } from 'react'
import {
  Customer,
  UserConfirmData,
  CreateWallet,
  CreateShare
} from '@models/index'
import {
  useCustomerService,
  useWalletService,
  useShareService,
  useValidateService
} from '@services/index'

import PropTypes from 'prop-types'

const useHomePage = props => {
  const [customers, setCustomers] = useState([])

  const {
    createNewCustomer,
    getAllCustomers,
    customerError,
    confirmFirstUserData
  } = useCustomerService()

  const {
    validateFullName,
    validateEmail,
    validatePassword
  } = useValidateService()

  const { getWallet } = useWalletService()

  const { createNewWallet, walletError } = useWalletService()
  const { createNewShare, checkShareCode, shareError } = useShareService()

  const doSubmitCustomer = async ({
    fullName,
    email,
    cpf,
    identity,
    phone,
    address
  }) => {
    const customer = new Customer({
      fullName,
      email,
      cpf,
      identity,
      phone,
      address
    })
    const result = await createNewCustomer(customer)

    if (result) {
      props?.onCloseCreateCustomerSlider()
    }
  }

  const doSubmitWallet = async ({ name, description }) => {
    const createWallet = new CreateWallet({ name, description })
    const result = await createNewWallet(createWallet)

    if (result) {
      props?.onCloseCreateWalletSlider()
    }
  }

  const doSubmitShare = async ({ shareCode, walletId }) => {
    const isValid = await checkShareCode(shareCode)

    if (isValid) {
      const share = new CreateShare({
        walletId,
        shareCode,
        qntShare: 0,
        qntWanted: 0
      })

      const result = await createNewShare(share)

      if (result) {
        props?.onCloseCreateShareSlider()
        await loadWalletById(walletId)
      }
    }
  }

  const doConfirmData = async ({ fullName, email, password }) => {
    if (
      validateFullName(fullName) &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      const userConfirmData = new UserConfirmData({ fullName, email, password })
      const result = await confirmFirstUserData(userConfirmData)

      if (result) {
        return props?.onSuccessDataConfirmation()
      }
    }
  }

  const loadCustomers = async () => {
    const result = await getAllCustomers()

    if (result?.userList) {
      setCustomers(result.userList)
    }
  }

  const loadWalletById = async id => {
    const walletResult = await getWallet(id)

    return walletResult
  }

  return {
    doSubmitCustomer,
    doSubmitWallet,
    doSubmitShare,
    loadCustomers,
    doConfirmData,
    customers,
    loadWalletById,
    error: customerError || walletError || shareError
  }
}

useHomePage.propTypes = {
  props: PropTypes.shape({
    onCloseCreateCustomerSlider: PropTypes.func,
    onCloseCreateWalletSlider: PropTypes.func
  })
}

export { useHomePage }
