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
    checkIfCodeIsValid,
    updateShare
  } = useShareApi({
    authorization
  })

  const createNewShare = async shareModel => {
    if (validate(shareModel)) {
      const result = await createShare(shareModel)

      if (result && result.data) {
        return result
      }
    }
  }

  const updateCurrentShare = async shareUpdateModel => {
    if (validate(shareUpdateModel)) {
      const result = await updateShare(shareUpdateModel)

      if (result && result.data) {
        return result
      }
    }
  }

  const getShare = async id => {
    const data = await getShareById(id)

    if (data) {
      return new Share(data)
    }
  }

  const validate = ({ shareCode }) => {
    if (!shareCode) {
      setError('Código é obrigatório.')
      return false
    }

    setError(null)
    return true
  }

  const checkShareCode = async shareCode => {
    const data = await checkIfCodeIsValid(shareCode)

    if (data) {
      return true
    }

    setError('Código inválido.')
  }

  return {
    createNewShare,
    shareError: error,
    getShare,
    checkShareCode,
    updateCurrentShare
  }
}

export { useShareService }
