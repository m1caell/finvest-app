import { useState } from 'react'
import { useShareApi } from '@services/api/share-api.service'
import { useAuthService } from '@services/auth/auth.service'
import { Share } from '@models/index'

const useShareService = () => {
  const [error, setError] = useState(null)

  const { authorization } = useAuthService()

  const {
    createShare,
    getShareById,
    updateWalletShares,
  } = useShareApi({
    authorization
  })

  const createNewShare = async shareModel => {
    if (validate(shareModel)) {
      try {
        const result = await createShare(shareModel)

        if (result && result.data) {
          return result
        }
      } catch (err) {
        if (err?.response?.data?.message) {
          setError(err?.response?.data?.message)
        } else {
          setError('Código inválido.')
        }
      }
    }
  }

  const updateNewWalletShares = async updateWalletSharesModel => {
    try {
      const result = await updateWalletShares(updateWalletSharesModel)

      if (result && result.data) {
        return result
      }
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err?.response?.data?.message)
      } else {
        setError('Erro ao atualizar.')
      }
    }
  }


  const getShare = async id => {
    const data = await getShareById(id)

    if (data) {
      return new Share(data)
    }
  }

  const validate = ({ share }) => {
    if (!share) {
      setError('Código é obrigatório.')
      return false
    }

    setError(null)
    return true
  }

  return {
    createNewShare,
    shareError: error,
    getShare,
    updateNewWalletShares
  }
}

export { useShareService }
