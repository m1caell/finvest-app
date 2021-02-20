import { useState, useEffect } from 'react'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { CardComponent, TitleComponent } from '@components'
import { SliderCreateCustomer } from './slider-create-customer.component'

const AnalystContent = () => {
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

  const renderContent = () => {
    return (
      <div className="home-page-analyst-list">
        <Alert variant="outlined" severity="info">
          Ainda não há cliente para mostrar aqui.
        </Alert>
      </div>
    )
  }

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
    <div className="home-page-analyst">
      <CardComponent>
        <TitleComponent>Clientes</TitleComponent>
        {renderContent()}
        <SwipeableDrawer
          anchor="right"
          open={isOpenDrawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div className="home-page-analyst-drawer">
            <SliderCreateCustomer
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
          Cliente cadastrado com sucesso.
        </Alert>
      </Snackbar>
    </div>
  )
}

export { AnalystContent }
