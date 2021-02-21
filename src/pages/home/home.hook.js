import { useState } from 'react'
import { Customer, UserConfirmData } from '@models/index'
import { useCustomerService } from '@services/index'
import PropTypes from 'prop-types'

const useHomePage = props => {
  const [customers, setCustomers] = useState([])

  const {
    createNewCustomer,
    getAllCustomers,
    confirmFirstUserData,
    error
  } = useCustomerService()

  const doSubmit = async ({ fullName, email, cpf, password }) => {
    const customer = new Customer({ fullName, email, cpf, password })
    const result = await createNewCustomer(customer)

    if (result) {
      props?.onCloseCreateCustomerSlider()
    }
  }

  const doConfirmData = async ({ fullName, email, password }) => {
    const userConfirmData = new UserConfirmData({ fullName, email, password })
    const result = await confirmFirstUserData(userConfirmData)

    if(result) {
      props?.onSuccessDataConfirmation()
    }
  }

  const loadCustomers = async () => {
    const result = await getAllCustomers()

    if (result?.userList) {
      setCustomers(result.userList)
    }
  }

  return {
    doSubmit,
    loadCustomers,
    customers,
    error,
    doConfirmData
  }
}

useHomePage.propTypes = {
  props: PropTypes.shape({
    onCloseCreateCustomerSlider: PropTypes.func
  })
}

export { useHomePage }
