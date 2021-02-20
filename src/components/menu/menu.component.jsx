import { Button } from '@material-ui/core'
import { USER_TYPE } from '@models/user.model'
import { useAuthService } from '@services'

import './menu.component.scss'

const MenuComponent = () => {
  const { loggedUser } = useAuthService()

  const analystOptions = ['CADASTRAR CLIENTE']

  const customerOptions = ['CRIAR CARTEIRA', 'SELECIONAR CARTEIRA']

  const renderButtons = () => {
    const type = loggedUser?.type
    let options = []

    if (type === USER_TYPE.ANALYST) {
      options = analystOptions
    }

    if (type === USER_TYPE.CUSTOMER) {
      options = customerOptions
    }

    return options.map((option, key) => (
      <Button id={`menuIdOption${key}`} key={key} variant="contained">
        {option}
      </Button>
    ))
  }

  return <div className="app-menu">{renderButtons()}</div>
}

export { MenuComponent }
