import { useState } from 'react'
import { Customer, Wallet } from '@models/index'
import { useCustomerService, useWalletService } from '@services/index'
import PropTypes from 'prop-types'

const useHomePage = props => {
  const [customers, setCustomers] = useState([])

  const {
    createNewCustomer,
    getAllCustomers,
    customerError
  } = useCustomerService()

  const { createNewWallet, walletError } = useWalletService()

  const doSubmitCustomer = async ({ fullName, email, cpf, password }) => {
    const customer = new Customer({ fullName, email, cpf, password })
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

  const loadCustomers = async () => {
    const result = await getAllCustomers()

    if (result?.userList) {
      setCustomers(result.userList)
    }
  }

  return {
    doSubmitCustomer,
    doSubmitWallet,
    loadCustomers,
    customers,
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
