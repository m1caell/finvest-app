import { useRequest } from './request.service'

const useShareApi = ({ authorization }) => {
  const { callPost, callGet } = useRequest({ authorization })

  const createShare = async shareModel => {
    try {
      const result = await callPost({
        url: '/share',
        data: shareModel
      })

      return result.data
    } catch (error) {
      console.error(error)
    }
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

  return { createShare, getShareById }
}

export { useShareApi }
