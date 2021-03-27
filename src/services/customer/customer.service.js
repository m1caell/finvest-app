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
    validatePhone,
    validateRg,
    validatePassword
  } = useValidateService()

  const { createCustomer, getAll, updateCustomerData } = useCustomerApi({
    authorization
  })

  const createNewCustomer = async customerModel => {
    if (
      validateFullName(customerModel.fullName) &&
      validateEmail(customerModel.email) &&
      validateCpf(customerModel.cpf) &&
      validateAddress(customerModel.address) &&
      validatePhone(customerModel.phone) &&
      validateRg(customerModel.identity)
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
      validateFullName(userConfirmData.fullName) &&
      validateEmail(userConfirmData.email) &&
      validateAddress(userConfirmData.address) &&
      validatePhone(userConfirmData.phone) &&
      validatePassword(userConfirmData.password)
    ) {
      userConfirmData.phone = userConfirmData.phone.replace(/[^0-11]/g, '')

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
