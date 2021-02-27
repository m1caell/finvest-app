import { useState } from 'react'
import { Customer, UserConfirmData, CreateWallet } from '@models/index'
import { useCustomerService, useWalletService } from '@services/index'
import PropTypes from 'prop-types'

const useHomePage = props => {
  const [customers, setCustomers] = useState([])
  const [wallet, setWallet] = useState(null)

  const {
    createNewCustomer,
    getAllCustomers,
    customerError,
    confirmFirstUserData
  } = useCustomerService()

  const { getWallet } = useWalletService()

  const { createNewWallet, walletError } = useWalletService()

  const doSubmitCustomer = async ({ fullName, email, cpf }) => {
    const customer = new Customer({ fullName, email, cpf })
    const result = await createNewCustomer(customer)

    if (result) {
      props?.onCloseCreateCustomerSlider()
    }
  }

  const doSubmitWallet = async ({ name, description }) => {
    const wallet = new CreateWallet({ name, description })
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

  const loadWalletById = async id => {
    const wallet = await getWallet(id)

    if (wallet) {
      setWallet(wallet)
      return true
    } else {
      return false
    }
  }

  return {
    doSubmitCustomer,
    doSubmitWallet,
    loadCustomers,
    doConfirmData,
    customers,
    loadWalletById,
    wallet,
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
