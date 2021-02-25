import { Button } from '@material-ui/core'
import { USER_TYPE } from '@models/user.model'
import { useAuthService } from '@services'

import './menu.component.scss'
import { WalletSelectComponent } from '@components/wallet-select/wallet-select.component'

const MenuComponent = () => {
  const { loggedUser } = useAuthService()

  const analystOptions = [{ name: 'CADASTRAR CLIENTE', type: 'button' }]

  const customerOptions = [
    { name: 'CRIAR CARTEIRA', type: 'button' },
    { name: 'SELECIONAR CARTEIRA', type: 'wallet-select' }
  ]

  const renderButtons = () => {
    const type = loggedUser?.type
    let options = []

    if (type === USER_TYPE.ANALYST) {
      options = analystOptions
    }

    if (type === USER_TYPE.CUSTOMER) {
      options = customerOptions
    }

    return options.map((option, key) => {
      if (option.type === 'wallet-select') {
        return (
          <WalletSelectComponent
            id={`menuIdOption${key}`}
            key={key}
            name={option.name}
          />
        )
      }

      return (
        <Button id={`menuIdOption${key}`} key={key} variant="contained">
          {option.name}
        </Button>
      )
    })
  }

  return <div className="app-menu">{renderButtons()}</div>
}

export { MenuComponent }
