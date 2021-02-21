import { useState } from 'react'
import { useWalletApi } from '@services/api/wallet-api.service'
import { useAuthService } from '@services/auth/auth.service'

const useWalletService = () => {
  const [error, setError] = useState(null)

  const { authorization } = useAuthService()

  const { createWallet, getAll } = useWalletApi({ authorization })

  const createNewWallet = async walletModel => {
    if (validate(walletModel)) {
      return await createWallet(walletModel)
    }
  }

  const getAllWallets = async () => {
    return await getAll()
  }

  const validate = ({ name, description }) => {
    if (!name) {
      setError('Nome é obrigatório.')
      return false
    }

    if (!description) {
      setError('Descrição é obrigatório.')
      return false
    }

    setError(null)
    return true
  }

  return { createNewWallet, walletError: error, getAllWallets }
}

export { useWalletService }
