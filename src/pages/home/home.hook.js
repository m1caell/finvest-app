import { Customer } from '@models/'
import { useCustomerService } from '@services/index'

const useHomePage = ({ onCloseCreateCustomerSlider = () => {} }) => {
  const { createNewCustomer, error } = useCustomerService()

  const doSubmit = async ({ fullName, email, cpf, password }) => {
    const customer = new Customer({ fullName, email, cpf, password })
    const result = await createNewCustomer(customer)

    if (result) {
      onCloseCreateCustomerSlider()
    }
  }

  return {
    doSubmit,
    error
  }
}

export { useHomePage }
