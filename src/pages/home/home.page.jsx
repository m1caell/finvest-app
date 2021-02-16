import { useAuthService } from '@services'
import { AnalystContent } from './components/analyst-content.component'
import { CustomerContent } from './components/customer-content.component'

const HomePage = () => {
  const { loggedUser } = useAuthService()

  const contentFromUserType = {
    ANALYST: { Component: AnalystContent },
    CUSTOMER: { Component: CustomerContent }
  }

  const renderContent = () => {
    if (loggedUser) {
      const userType = loggedUser.type
      const Content = contentFromUserType[userType].Component

      return <Content />
    }

    return null
  }

  return (
    <div>
      <h1>Home</h1>
      {renderContent()}
    </div>
  )
}

export { HomePage }
