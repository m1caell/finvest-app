import { Button } from '@material-ui/core'
import { useAuthService } from '@services'
import { ReactComponent as FinvestLogo } from '@static/finvest-logo.svg'
import { Link } from 'react-router-dom'

import './header.component.scss'

const HeaderComponent = () => {
  const { signout } = useAuthService()

  return (
    <header className="header">
      <Link to="/">
        <FinvestLogo />
      </Link>
      <Button onClick={signout} className="header-logout-button">
        SAIR
      </Button>
    </header>
  )
}

export { HeaderComponent }
