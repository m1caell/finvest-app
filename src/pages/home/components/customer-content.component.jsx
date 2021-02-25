import { useState, useEffect } from 'react'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { SliderCreateWallet } from './slider-create-wallet.component'
import { useAuthService } from '@services/index'
import { User } from '@models/index'
import {
  Dialog,
  DialogContentText,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import { ConfirmDataModal } from './confirm-data-modal/confirm-data-modal.component'

const CustomerContent = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showFirstDialogAccess, setShowFirstDialogAccess] = useState(false)

  const { loggedUser, updateLoggedUser } = useAuthService()

  useEffect(() => {
    document
      .getElementById('menuIdOption0')
      ?.addEventListener('click', () => setIsOpenDrawer(true))

    setShowFirstDialogAccess(loggedUser?.firstLogin)

    return () => {
      document
        .getElementById('menuIdOption0')
        ?.removeEventListener('click', () => toggleDrawer(true))
    }
  }, [])

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setIsOpenDrawer(open)
  }

  const onSuccessModel = () => {
    const { id, name, email, type, token } = loggedUser
    const user = new User({ id, firstLogin: false, name, email, type, token })

    setShowFirstDialogAccess(false)
    setShowSuccessAlert(true)
    updateLoggedUser(user)
  }

  const renderFirstDialogAccess = () => (
    <Dialog
      open={showFirstDialogAccess}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Olá, esse é seu primeiro acesso, <br />
        confirme seus dados abaixo!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Um de nossos analistas cadastrou <br />
          seus dados, verifique se eles estão <br />
          corretos e cadastre uma senha de sua <br />
          preferencia para prosseguir.
        </DialogContentText>
        <ConfirmDataModal onSuccess={onSuccessModel} />
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="home-page-customer">
      {renderFirstDialogAccess()}
      <div className="home-page-customer-list">
        {loggedUser?.selectedWallet?.name}
      </div>
      <div className="home-page-customer-drawer">
        <SwipeableDrawer
          anchor="right"
          open={isOpenDrawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div className="home-page-customer-drawer">
            <SliderCreateWallet
              onSuccessMessage={() => setShowSuccessAlert(true)}
              setIsOpenDrawer={setIsOpenDrawer}
            />
          </div>
        </SwipeableDrawer>
        <Snackbar
          open={showSuccessAlert}
          autoHideDuration={6000}
          onClose={() => setShowSuccessAlert(false)}
        >
          <Alert onClose={() => setShowSuccessAlert(false)} severity="success">
            Carteira cadastrada com sucesso.
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}

export { CustomerContent }
