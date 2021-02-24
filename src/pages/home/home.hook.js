import { useState } from 'react'
import { Customer, Wallet, UserConfirmData } from '@models/index'
import { useCustomerService, useWalletService } from '@services/index'
import PropTypes from 'prop-types'

const useHomePage = props => {
  const [customers, setCustomers] = useState([])
  const [wallets, setWallets] = useState([])
  const {
    createNewCustomer,
    getAllCustomers,
    customerError,
    confirmFirstUserData
  } = useCustomerService()

  const { createNewWallet, walletError, getAllWallets } = useWalletService()

  const doSubmitCustomer = async ({ fullName, email, cpf }) => {
    const customer = new Customer({ fullName, email, cpf })
    const result = await createNewCustomer(customer)

    if (result) {
      props?.onCloseCreateCustomerSlider()
    }
  }

  const doSubmitWallet = async ({ name, description }) => {
    const wallet = new Wallet({ name, description })
    const result = await createNewWallet(wallet)

    if (result) {
      props?.onCloseCreateWalletSlider()
    }
  }

  const doConfirmData = async ({ fullName, email, password }) => {
    const userConfirmData = new UserConfirmData({ fullName, email, password })
    const result = await confirmFirstUserData(userConfirmData)

    if (result) {
      props?.onSuccessDataConfirmation()
    }
  }

  const loadCustomers = async () => {
    const result = await getAllCustomers()

    if (result?.userList) {
      setCustomers(result.userList)
    }
  }

  const loadWallets = async () => {
    const result = await getAllWallets()

    if (result?.userList) {
      setWallets(result.userList)
    }
  }

  return {
    doSubmitCustomer,
    doSubmitWallet,
    loadCustomers,
    loadWallets,
    doConfirmData,
    customers,
    wallets,
    error: customerError || walletError
  }
}

useHomePage.propTypes = {
  props: PropTypes.shape({
    onCloseCreateCustomerSlider: PropTypes.func,
    onCloseCreateWalletSlider: PropTypes.func
  })
}

export { useHomePage }
