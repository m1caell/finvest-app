import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import { useAuthService } from '@services'
import { ReactComponent as FinvestLogoText } from '@static/logo-text.svg'
import { Link } from 'react-router-dom'

import './header.component.scss'

const HeaderComponent = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const { signout } = useAuthService()

  const onClickAgree = () => {
    setIsOpenDialog(false)
    signout()
  }

  const renderDialog = () => (
    <Dialog
      open={isOpenDialog}
      onClose={() => setIsOpenDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirmação</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Você deseja realmente sair do sistema?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpenDialog(false)} color="primary">
          Voltar
        </Button>
        <Button onClick={onClickAgree} color="primary" autoFocus>
          Sair
        </Button>
      </DialogActions>
    </Dialog>
  )

  return (
    <header className="header">
      <Link to="/">
        <FinvestLogoText />
      </Link>
      <Button
        onClick={() => setIsOpenDialog(true)}
        className="header-logout-button"
      >
        SAIR
      </Button>
      {renderDialog()}
    </header>
  )
}

export { HeaderComponent }
