import { useState, useEffect } from 'react'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { CardComponent, TitleComponent } from '@components'
import { SliderCreateCustomer } from './slider-create-customer.component'
import { CustomerRow } from './customer-row.component'
import { useHomePage } from '../home.hook'

const AnalystContent = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const { loadCustomers, customers } = useHomePage()

  useEffect(() => {
    document
      .getElementById('menuIdOption0')
      ?.addEventListener('click', () => setIsOpenDrawer(true))

    loadCustomers()

    return () => {
      document
        .getElementById('menuIdOption0')
        ?.removeEventListener('click', () => toggleDrawer(true))
    }
  }, [])

  const renderContent = () => {
    if (customers.length) {
      return customers.map((customer, key) => (
        <CustomerRow key={key} data={customer} />
      ))
    }

    return (
      <Alert variant="outlined" severity="info">
        Ainda não há cliente para mostrar aqui.
      </Alert>
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
        <div className="home-page-analyst-list">{renderContent()}</div>
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
              loadCustomers={loadCustomers}
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
