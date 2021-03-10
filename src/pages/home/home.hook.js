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
  useShareService
} from '@services/index'
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
  const { createNewShare, shareError } = useShareService()

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
    const wallet = new CreateWallet({ name, description })
    const result = await createNewWallet(wallet)

    if (result) {
      props?.onCloseCreateWalletSlider()
    }
  }

  const doSubmitShare = async ({ code }) => {
    const share = new CreateShare({ code })
    const result = await createNewShare(share)

    if (result) {
      props?.onCloseCreateWalletSlider()
    }
  }

  const doConfirmData = async ({ fullName, email, password }) => {
    console.log()
    const userConfirmData = new UserConfirmData({ fullName, email, password })
    const result = await confirmFirstUserData(userConfirmData)
    console.log(userConfirmData)
    console.log(result)
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
    doSubmitShare,
    loadCustomers,
    doConfirmData,
    customers,
    loadWalletById,
    wallet,
    error: customerError || walletError,
    shareError
  }
}

useHomePage.propTypes = {
  props: PropTypes.shape({
    onCloseCreateCustomerSlider: PropTypes.func,
    onCloseCreateWalletSlider: PropTypes.func
  })
}

export { useHomePage }
