import { useCustomerApi } from '@services/api/customer-api.service'
import { useAuthService } from '@services/auth/auth.service'
import { useValidateService } from '@services/validate/validate.service'

const useCustomerService = () => {
  const { authorization } = useAuthService()

  const {
    validateFullName,
    validateEmail,
    validateCpf,
    validateAddress,
    validateRg,
    validatePassword
  } = useValidateService()

  const { createCustomer, getAll, updateCustomerData } = useCustomerApi({
    authorization
  })

  const createNewCustomer = async customerModel => {
    if (
      validateFullName(customerModel) &&
      validateEmail(customerModel) &&
      validateCpf(customerModel) &&
      validateAddress(customerModel) &&
      validateRg(customerModel)
    ) {
      customerModel.cpf = customerModel.cpf.replace(/[^0-9]/g, '')
      customerModel.identity = customerModel.identity.replace(/[^0-9]/g, '')
      customerModel.phone = customerModel.phone.replace(/[^0-9]/g, '')

      return await createCustomer(customerModel)
    }
  }

  const getAllCustomers = async () => {
    return await getAll()
  }

  const confirmFirstUserData = async userConfirmData => {
    if (
      validateFullName(userConfirmData) &&
      validateEmail(userConfirmData) &&
      validatePassword(userConfirmData)
    ) {
      return await updateCustomerData(userConfirmData)
    }
  }

  return {
    createNewCustomer,
    getAllCustomers,
    confirmFirstUserData
  }
}

export { useCustomerService }
