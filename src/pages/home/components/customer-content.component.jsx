import { useState, useEffect } from 'react'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { CardComponent, TitleComponent } from '@components'

import { SliderCreateWallet } from './slider-create-wallet.component'

const CustomerContent = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  useEffect(() => {
    document
      .getElementById('menuIdOption0')
      ?.addEventListener('click', () => setIsOpenDrawer(true))

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

  return (
    <div className="home-page-customer">
      <div className="home-page-customer-list"></div>
      <div className="home-page-customer-drawer">
        <CardComponent>
          <TitleComponent>Carteiras</TitleComponent>
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
        </CardComponent>
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
