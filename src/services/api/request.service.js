import axios from 'axios'
import { useLoadingService } from '@services/loading/loading.service'
import { useHistory } from 'react-router-dom'

const LS_LOGGED_USER_NAME = 'loggedUser'
const useRequest = extraConfig => {
  const pathUrl = 'http://localhost:8080/api'

  const { showLoading, hideLoading } = useLoadingService()
  const history = useHistory()

  const axiosConfig = {
    headers: {
      Authorization: extraConfig?.authorization
    }
  }

  axios.interceptors.request.use(
    config => {
      showLoading()
      return config
    },
    error => {
      hideLoading()
      return Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    response => {
      hideLoading()
      return response
    },
    error => {
      if (error?.response?.data?.status === 403) {
        localStorage.removeItem(LS_LOGGED_USER_NAME)
        history.push('/login?authorizationFail=true')
      }
      hideLoading()
      return Promise.reject(error)
    }
  )

  const callGet = async ({ url, config = {} }) => {
    const result = await axios.get(`${pathUrl}${url}`, axiosConfig)
    return result.data
  }

  const callPost = async ({ url, data, config }) => {
    return await axios.post(`${pathUrl}${url}`, data, axiosConfig)
  }

  const callPut = async ({ url, data, config }) => {
    return await axios.put(`${pathUrl}${url}`, data, axiosConfig)
  }

  const callDelete = async ({ url, data, config }) => {
    return await axios.delete(`${pathUrl}${url}`, axiosConfig)
  }

  const callCustomAPI = async ({ url, requestType, data, config }) => {
    if (requestType === 'post' || requestType === 'put') {
      return await axios[requestType](url, data, { ...config })
    }

    return await axios[requestType](url, { config })
  }

  return {
    callGet,
    callPost,
    callPut,
    callDelete,
    callCustomAPI
  }
}

export { useRequest }
