import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContentText,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { ConfirmDataModal } from './confirm-data-modal/confirm-data-modal.component'
import { useAuthService } from '@services/index'
import { User } from '@models/'

const CustomerContent = () => {
  const [showFirstDialogAccess, setShowFirstDialogAccess] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const { loggedUser, updateLoggedUser } = useAuthService()

  useEffect(() => {
    setShowFirstDialogAccess(loggedUser?.firstLogin)
  }, [])

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
      onClose={() => setShowFirstDialogAccess(false)}
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
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={6000}
        onClose={() => setShowSuccessAlert(false)}
      >
        <Alert onClose={() => setShowSuccessAlert(false)} severity="success">
          Dados atualizados com sucesso.
        </Alert>
      </Snackbar>
    </div>
  )
}

export { CustomerContent }
