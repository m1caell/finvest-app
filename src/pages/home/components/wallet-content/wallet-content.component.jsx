import { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { CardComponent, TitleComponent } from '@components/index'
import PropTypes from 'prop-types'

import './wallet-content.style.scss'
import { useAuthService } from '@services/'

const WalletContent = props => {
  const [selectedWallet, setSelectedWallet] = useState(null)

  const { loggedUser } = useAuthService()

  useEffect(() => {
    if (selectedWallet !== loggedUser?.selectedWallet) {
      setSelectedWallet(loggedUser?.selectedWallet)
    }
  }, [loggedUser])

  return (
    <CardComponent className="wallet-content">
      <header className="wallet-content-header">
        <TitleComponent>
          Carteira: <strong>{selectedWallet?.name}</strong>
        </TitleComponent>
        <div className="header-controls">
          <Button variant="contained">Adicionar ação</Button>
          <Button variant="contained">Editar carteira</Button>
        </div>
      </header>
      <div className="wallet-content-main">
        Table aqui
      </div>
    </CardComponent>
  )
}

WalletContent.propTypes = {}

export { WalletContent }
