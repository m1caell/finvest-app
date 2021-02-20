import { useState } from 'react'
import { Customer } from '@models/'
import { useCustomerService } from '@services/index'
import PropTypes from 'prop-types'

const useHomePage = props => {
  const [customers, setCustomers] = useState([])

  const { createNewCustomer, getAllCustomers, error } = useCustomerService()

  const doSubmit = async ({ fullName, email, cpf, password }) => {
    const customer = new Customer({ fullName, email, cpf, password })
    const result = await createNewCustomer(customer)

    if (result) {
      props?.onCloseCreateCustomerSlider()
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
    error
  }
}

useHomePage.propTypes = {
  props: PropTypes.shape({
    onCloseCreateCustomerSlider: PropTypes.func
  })
}

export { useHomePage }
