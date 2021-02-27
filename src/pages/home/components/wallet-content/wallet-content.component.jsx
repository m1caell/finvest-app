import { Button } from '@material-ui/core'
import { CardComponent, TitleComponent } from '@components/index'
import PropTypes from 'prop-types'

import './wallet-content.style.scss'

const WalletContent = ({ wallet }) => {
  return wallet ? (
    <CardComponent className="wallet-content">
      <header className="wallet-content-header">
        <TitleComponent>
          Carteira: <strong>{wallet.name}</strong>
        </TitleComponent>
        <div className="header-controls">
          <Button variant="contained">Adicionar ação</Button>
          <Button variant="contained">Editar carteira</Button>
        </div>
      </header>
      <div className="wallet-content-main">{/* Table aqui */}</div>
    </CardComponent>
  ) : null
}

WalletContent.propTypes = {
  wallet: PropTypes.object
}

export { WalletContent }
