import { useState } from 'react'
import { useWalletApi } from '@services/api/wallet-api.service'
import { useAuthService } from '@services/auth/auth.service'
import { User, WalletListItem } from '@models/index'

const useWalletService = () => {
  const [error, setError] = useState(null)

  const { authorization, loggedUser, updateLoggedUser } = useAuthService()

  const { createWallet, getAll } = useWalletApi({ authorization })

  const createNewWallet = async walletModel => {
    if (validate(walletModel)) {
      const result = await createWallet(walletModel)

      if (result && result.data) {
        const user = new User(loggedUser)
        const walletListItem = new WalletListItem({
          id: result.data.walletId,
          name: result.data.name
        })
        user.walletList.push(walletListItem)

        updateLoggedUser(user)
      }

      return result
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
