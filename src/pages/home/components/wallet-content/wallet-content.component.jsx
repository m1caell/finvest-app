import { useMemo, useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { DataGrid } from '@material-ui/data-grid'
import { CardComponent, TitleComponent } from '@components/index'
import { SliderCreateShare } from '@pages/home/components/slider-create-share.component'

import './wallet-content.style.scss'
import { useWalletService } from '@services/'

const SHARE_CREATION_SUCCESS_MESSAGE = {
  text: 'Ação adicionada com sucesso.',
  type: 'success'
}

const WalletContent = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState(null)
  const [rows, setRows] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)

  const { selectedWallet } = useWalletService()

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

  useEffect(() => {
    if (selectedWallet?.walletShareList) {
      const rowsPrepared = prepareRows()
      setRows(rowsPrepared)
    }
  }, [selectedWallet])

  const prepareRows = () => {
    return selectedWallet.walletShareList.map(
      ({ walletShareId, share, qntShare, qntWanted, sector, price }, key) => {
        return {
          id: key,
          walletShareId,
          share,
          qntShare,
          qntWanted,
          sector,
          price,
          updatedPatrimony: 100,
          currentPatrimony: 50,
          objective: 50,
          objectiveDistance: 50,
          suggestion: 100
        }
      }
    )
  }

  const columns = useMemo(
    () => [
      { field: 'walletShareId', headerName: 'ID', width: 100 },
      { field: 'share', headerName: 'Código', width: 100 },
      { field: 'sector', headerName: 'Setor', width: 200 },
      { field: 'qntShare', headerName: 'Quantidade', width: 130 },
      { field: 'price', headerName: 'Cotação', width: 110 },
      {
        field: 'updatedPatrimony',
        headerName: 'Patrimônio Atualizado',
        width: 200
      },
      { field: 'currentPatrimony', headerName: 'Patrimônio Atual', width: 160 },
      { field: 'objective', headerName: 'Objetivo', width: 130 },
      {
        field: 'objectiveDistance',
        headerName: 'Distância do Objetivo',
        width: 190
      },
      { field: 'suggestion', headerName: 'Recomendação R$', width: 180 }
    ],
    []
  )

  const renderTableShares = () => {
    return (
      <div className="wallet-content-table">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          onRowSelected={param => setSelectedRow(param)}
        />
      </div>
    )
  }

  return selectedWallet ? (
    <CardComponent className="wallet-content">
      <header className="wallet-content-header">
        <TitleComponent>
          Carteira: <strong>{selectedWallet.name}</strong>
        </TitleComponent>
        <div className="header-controls">
          <Button onClick={() => setIsOpenDrawer(true)} variant="contained">
            Adicionar Ação
          </Button>
          <Button id="putWallet" variant="contained">
            Editar Carteira
          </Button>
        </div>
      </header>
      <div className="share-content-main">{renderTableShares()}</div>
      <div className="wallet-content-drawer">
        <SwipeableDrawer
          anchor="right"
          open={isOpenDrawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div className="wallet-content-drawer">
            <SliderCreateShare
              onSuccessMessage={() =>
                setSnackbarMessage(SHARE_CREATION_SUCCESS_MESSAGE)
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
    </CardComponent>
  ) : null
}

export { WalletContent }
