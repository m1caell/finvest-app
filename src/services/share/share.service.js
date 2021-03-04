import { useState } from 'react'
import { useShareApi } from '@services/api/share-api.service'
import { useAuthService } from '@services/auth/auth.service'
import { User, Share, WalletListItem } from '@models/index'

const useShareService = () => {
  const [error, setError] = useState(null)

  const { authorization, loggedUser, updateLoggedUser } = useAuthService()

  const { createShare, getShareById } = useShareApi({ authorization })

  const createNewShare = async shareModel => {
    if (validate(shareModel)) {
      const result = await createShare(shareModel)

      if (result && result.data) {
        const user = new User(loggedUser)
        const walletListItem = new WalletListItem({
          id: result.data.walletId,
          code: result.data.code
        })
        user.shareList.push(walletListItem)

        updateLoggedUser(user)
      }

      return result
    }
  }

  const getShare = async id => {
    const data = await getShareById(id)

    if (data) {
      return new Share(data)
    }
  }

  const validate = ({ code }) => {
    if (!code) {
      setError('Código é obrigatório.')
      return false
    }

    setError(null)
    return true
  }

  return { createNewShare, shareError: error, getShare }
}

export { useShareService }
