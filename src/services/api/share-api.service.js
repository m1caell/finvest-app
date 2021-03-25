import { useRequest } from './request.service'

const useShareApi = ({ authorization }) => {
  const { callPost, callGet, callPut } = useRequest({ authorization })

  const createShare = async shareModel => {
    return await callPost({
      url: '/share',
      data: shareModel
    })
  }

  const updateWalletShares = async updateWalletShares => {
    return await callPut({
      url: '/share',
      data: updateWalletShares
    })
  }

  const getShareById = async id => {
    try {
      const result = await callGet({
        url: `/share/${id}`
      })

      return result.data
    } catch (error) {
      console.error(error)
    }
  }

  return { createShare, getShareById, updateWalletShares }
}

export { useShareApi }
