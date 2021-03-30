import { useRequest } from './request.service'

const useWalletApi = ({ authorization }) => {
  const { callPost, callGet, callDelete } = useRequest({ authorization })

  const createWallet = async walletModel => {
    try {
      const result = await callPost({
        url: '/wallet',
        data: walletModel
      })

      return result.data
    } catch (error) {
      console.error(error)
    }
  }

  const getWalletById = async id => {
    try {
      const result = await callGet({
        url: `/wallet/${id}`
      })

      return result.data
    } catch (error) {
      console.error(error)
    }
  }

  const deleteWalletById = async id => {
    try {
      const result = await callDelete({
        url: `/wallet/${id}`
      })

      return result.data
    } catch (error) {
      console.error(error)
    }
  }

  return { createWallet, getWalletById, deleteWalletById }
}

export { useWalletApi }
