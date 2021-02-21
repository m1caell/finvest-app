import { useRequest } from './request.service'

const useWalletApi = ({ authorization }) => {
  const { callPost, callGet } = useRequest({ authorization })

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

  const getAll = async () => {
    try {
      const result = await callGet({
        url: '/wallet/list'
      })

      return result.data
    } catch (error) {
      console.error(error)
    }
  }

  return { createWallet, getAll }
}

export { useWalletApi }
