import { createGlobalState } from 'react-hooks-global-state'

const { useGlobalState } = createGlobalState({ loader: false })

let loadingCounter = 0
const useLoadingService = () => {
  const [isLoading, setIsLoading] = useGlobalState('loader')

  const showLoading = () => {
    loadingCounter++
    setIsLoading(loadingCounter > 0)
  }

  const hideLoading = () => {
    loadingCounter--
    setIsLoading(loadingCounter > 0)
  }

  return { isLoading, showLoading, hideLoading }
}

export { useLoadingService }
