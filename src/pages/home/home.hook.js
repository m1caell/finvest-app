import { useState } from 'react'
import {
  Customer,
  UserConfirmData,
  CreateWallet,
  CreateShare,
  UpdateWalletShares
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
  const [rows, setRows] = useState([])

  const {
    createNewCustomer,
    getAllCustomers,
    customerError,
    confirmFirstUserData
  } = useCustomerService()

  const {
    validateFullName,
    validateEmail,
    validateAddress,
    validatePhone,
    validatePassword
  } = useValidateService()

  const { getWallet } = useWalletService()

  const { createNewWallet, walletError } = useWalletService()
  const { createNewShare, updateNewWalletShares, shareError } = useShareService()

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

  const doUpdateWalletShares = async ({ currentWalletId }) => {
    const updateWalletSharesModel = new UpdateWalletShares({ walletId: currentWalletId, walletShareList: rows })

    const result = await updateNewWalletShares(updateWalletSharesModel)
    console.log(result)

    if (result?.data) {
      return true
    }

    return false
  }

  const doSubmitWallet = async ({ name, description }) => {
    const createWallet = new CreateWallet({ name, description })
    const result = await createNewWallet(createWallet)

    if (result) {
      props?.onCloseCreateWalletSlider()
    }
  }

  const doSubmitShare = async ({ share, walletId }) => {
    const shareRequest = new CreateShare({
      walletId,
      share,
      qntShare: 0,
      qntWanted: 0
    })

    const shareResponse = await createNewShare(shareRequest)

    if (shareResponse?.data) {
      const {
        walletShareId,
        share,
        qntShare,
        qntWanted,
        price,
        sector
      } = shareResponse.data.data

      const newShare = {
        walletShareId,
        share,
        qntShare,
        qntWanted,
        sector,
        price,
        currentHeritage: price * qntShare,
        currentParticipation: 0,
        distanceFromQntWanted: 0,
        suggestion: 0
      }

      const newRowsList = rows.map(item => item)
      newRowsList.push(newShare)
      console.log(newRowsList)
      setRows(newRowsList)
      props?.onCloseCreateShareSlider()
    }
  }

  const doConfirmData = async ({
    fullName,
    email,
    phone,
    address,
    password
  }) => {
    if (
      validateFullName(fullName) &&
      validateEmail(email) &&
      validatePhone(phone) &&
      validateAddress(address) &&
      validatePassword(password)
    ) {
      const userConfirmData = new UserConfirmData({
        fullName,
        email,
        phone,
        address,
        password
      })
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
    rows,
    setRows,
    doUpdateWalletShares,
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
