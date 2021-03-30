import { useState, useEffect } from 'react'
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
  const [valueToSimulate, setValueToSimulate] = useState("")
  const [rest, setRest] = useState(null)
  const [filterBySector, setFilterBySector] = useState("")
  const [rowsFiltered, setRowsFiltered] = useState([])

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

  const { createNewWallet, walletError, getWallet, getCalculateSimulation } = useWalletService()
  const { createNewShare, updateNewWalletShares, shareError } = useShareService()

  useEffect(() => {
    if (!valueToSimulate) {
      setRest("")
      setRows(rows.map(share => {
        share.suggestion = 0
        share.projectedDistanceFromQntWanted = null

        return share
      }))
    }

  }, [valueToSimulate])

  const doFilterBySector = () => {
    const filtered = rows.filter((share) => share.sector.toUpperCase().includes(filterBySector.toUpperCase()))
    setRowsFiltered(filtered)
  }

  useEffect(() => {
    doFilterBySector()
  }, [filterBySector])

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

  const doSimulateCalc = () => {
    const { walletShares, rest } = getCalculateSimulation(valueToSimulate, rows)
    setRows(walletShares)
    setRest(rest)
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
    valueToSimulate,
    setValueToSimulate,
    doSimulateCalc,
    rest,
    setRest,
    filterBySector,
    setFilterBySector,
    rowsFiltered,
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
