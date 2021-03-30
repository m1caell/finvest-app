import { useState, useEffect } from 'react'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { SliderCreateWallet } from './slider-create-wallet.component'
import { WalletContent } from './wallet-content/wallet-content.component'
import { useHomePage } from '../home.hook'
import { useAuthService } from '@services/index'
import { User } from '@models/index'
import {
  Dialog,
  DialogContentText,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import { ConfirmDataModal } from './confirm-data-modal/confirm-data-modal.component'
import { useLocation, useHistory } from 'react-router-dom'

const WALLET_URL = '/home/wallet/'
const WALLET_CREATION_SUCCESS_MESSAGE = {
  text: 'Carteira cadastrada com sucesso.',
  type: 'success'
}

const CUSTOMER_CREATION_SUCCESS_MESSAGE = {
  text: 'Cliente confirmado com sucesso.',
  type: 'success'
}

const WALLET_NOT_FOUNT_MESSAGE = {
  text: 'Carteira não encontrada.',
  type: 'error'
}

const CustomerContent = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState(null)
  const [showFirstDialogAccess, setShowFirstDialogAccess] = useState(false)
  const [currentWalletId, setCurrentWalletId] = useState(null)

  const { loggedUser, updateLoggedUser } = useAuthService()
  const {
    loadWalletById,
    rows,
    setRows,
    doSubmitShare,
    doUpdateWalletShares,
    error,
    valueToSimulate,
    setValueToSimulate,
    doSimulateCalc,
    rest,
    setRest,
    filterBySector,
    setFilterBySector,
    rowsFiltered,
    removeShareFromList
  } = useHomePage()
  const location = useLocation()
  const history = useHistory()

  const loadWallet = async () => {
    const isWalletUrl = location.pathname.includes(WALLET_URL)
    const urlWalletId = Number(location.pathname.replace(WALLET_URL, ''))

    if (isWalletUrl && urlWalletId) {
      const findedWithSuccess = await loadWalletById(urlWalletId)
      setCurrentWalletId(urlWalletId)

      if (!findedWithSuccess) {
        setSnackbarMessage(WALLET_NOT_FOUNT_MESSAGE)
        setCurrentWalletId(null)
        history.push('/home')
      }
    } else {
      setCurrentWalletId(null)
    }
  }

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

  useEffect(() => {
    loadWallet()
  }, [location.pathname])

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
    setSnackbarMessage(CUSTOMER_CREATION_SUCCESS_MESSAGE)
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
      <div>
        <WalletContent
          currentWalletId={currentWalletId}
          rows={rows}
          setRows={setRows}
          doSubmitShare={doSubmitShare}
          error={error}
          doUpdateWalletShares={doUpdateWalletShares}
          valueToSimulate={valueToSimulate}
          setValueToSimulate={setValueToSimulate}
          doSimulateCalc={doSimulateCalc}
          rest={rest}
          setRest={setRest}
          filterBySector={filterBySector}
          setFilterBySector={setFilterBySector}
          rowsFiltered={rowsFiltered}
          removeShareFromList={removeShareFromList}
        />
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
              onSuccessMessage={() =>
                setSnackbarMessage(WALLET_CREATION_SUCCESS_MESSAGE)
              }
              setIsOpenDrawer={setIsOpenDrawer}
            />
          </div>
        </SwipeableDrawer>
        <Snackbar
          open={!!snackbarMessage}
          autoHideDuration={6000}
          onClose={() => setSnackbarMessage(null)}
        >
          <Alert
            onClose={() => setSnackbarMessage(null)}
            severity={snackbarMessage?.type}
          >
            {snackbarMessage?.text}
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}

export { CustomerContent }
