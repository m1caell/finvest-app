import CircularProgress from '@material-ui/core/CircularProgress'
import { useLoadingService } from '@services/index'

import './loader.component.scss'

const LoaderComponent = () => {
  const { isLoading } = useLoadingService()

  if (!isLoading) {
    return null
  }

  return (
    <div className="loader-wrapper">
      <div className="loader-content">
        <CircularProgress style={{ width: 60, height: 60 }} />
      </div>
    </div>
  )
}

export { LoaderComponent }
