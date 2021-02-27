import { useState, useEffect } from 'react'
import { Button, Menu, MenuItem } from '@material-ui/core'
import { useAuthService } from '@services/index'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import './wallet-select.component.scss'

const WALLET_URL = '/home/wallet/'
const WalletSelectComponent = ({ id, name, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const { loggedUser } = useAuthService()
  const history = useHistory()

  useEffect(() => {
    const isWalletUrl = location.pathname.includes(WALLET_URL)

    if (!isWalletUrl && loggedUser?.walletList.length) {
      const firstWallet = loggedUser.walletList[0]
      history.push(`/home/wallet/${firstWallet.id}`)
    }
  }, [])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onClickItem = wallet => {
    handleClose()
    history.push(`/home/wallet/${wallet.id}`)
    window.scrollTo(0, 0)
  }

  const renderMenuItem = () => {
    if (loggedUser?.walletList.length) {
      return loggedUser?.walletList.map((wallet, key) => (
        <MenuItem key={key} onClick={() => onClickItem(wallet)}>
          <div className="menu-item-content">{wallet.name}</div>
        </MenuItem>
      ))
    }

    return (
      <MenuItem>
        <div className="menu-item-content">Você ainda não tem carteiras</div>
      </MenuItem>
    )
  }

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
