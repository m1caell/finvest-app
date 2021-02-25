import { useState } from 'react'
import { Button, Menu, MenuItem } from '@material-ui/core'
import { useAuthService } from '@services/index'
import PropTypes from 'prop-types'

import './wallet-select.component.scss'
import { User } from '@models/'

const WalletSelectComponent = ({ id, name, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const { loggedUser, updateLoggedUser } = useAuthService()

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onClickItem = wallet => {
    const user = new User(loggedUser)

    // TODO: fazer request aqui da wallet por id e pegar resultado e salvar na selected wallet
    user.selectedWallet = wallet

    updateLoggedUser(user)
    handleClose()
  }

  const renderMenuItem = () =>
    loggedUser?.walletList.map((wallet, key) => (
      <MenuItem key={key} onClick={() => onClickItem(wallet)}>
        <div className="menu-item-content">{wallet.name}</div>
      </MenuItem>
    ))

  return (
    <>
      <Button
        aria-controls={id}
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        {...props}
      >
        {name}
      </Button>
      <Menu
        id={id}
        anchorEl={anchorEl}
        elevation={0}
        className="wallet-select"
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        {renderMenuItem()}
      </Menu>
    </>
  )
}

WalletSelectComponent.defaultProps = {
  name: 'Selecionar carteira'
}

WalletSelectComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string
}

export { WalletSelectComponent }
