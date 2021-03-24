import { useEffect } from 'react'
import { LayoutBodyComponent } from '@components'
import { useWalletService, useAuthService } from '@services/'
import { AnalystContent } from './components/analyst-content.component'
import { CustomerContent } from './components/customer-content.component'

import './home.page.scss'

const HomePage = () => {
  const { loggedUser } = useAuthService()
  const { setWallet } = useWalletService()

  useEffect(() => {
    setWallet(null)
  }, [])

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
    <LayoutBodyComponent>
      <div className="home-page">{renderContent()}</div>
    </LayoutBodyComponent>
  )
}

export { HomePage }
