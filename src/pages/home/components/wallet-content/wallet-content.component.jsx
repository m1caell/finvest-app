import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { CardComponent, TitleComponent } from '@components/index'
import { SliderCreateShare } from '@pages/home/components/slider-create-share.component'
import { useWalletService } from '@services/'

import './wallet-content.style.scss'

const SHARE_CREATION_SUCCESS_MESSAGE = {
  text: 'Ação adicionada com sucesso.',
  type: 'success'
}

const WalletContent = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState(null)
  const [rows, setRows] = useState([])

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
      (
        {
          walletShareId,
          share = '-',
          qntShare = 0,
          qntWanted = 0,
          sector = 'Sem informação a exibir',
          price = 'Falha',
          currentHeritage = 0,
          currentParticipation = 0,
          distanceFromQntWanted = 0,
          suggestion = 0
        },
        key
      ) => {
        return {
          walletShareId,
          share,
          qntShare,
          qntWanted,
          sector,
          price,
          currentHeritage,
          currentParticipation,
          distanceFromQntWanted,
          suggestion
        }
      }
    )
  }

  const handleBlurQuantity = ({ event, itemShare }) => {
    if (itemShare.qntShare !== Number(event.target.value)) {
      itemShare.qntShare = Number(event.target.value)

      // chamar edição
    }
  }

  const handleBlurObjective = ({ event, itemShare }) => {
    if (itemShare.qntWanted !== Number(event.target.value)) {
      itemShare.qntWanted = Number(event.target.value)

      // chamar edição
    }
  }

  const renderRows = () => {
    if (rows.length) {
      return rows.map((itemShare, key) => {
        return (
          <tr key={key}>
            <td>{itemShare.share}</td>
            <td>{itemShare.sector}</td>
            <td>
              <input
                type="number"
                placeholder="Ex.: 1"
                onBlur={event => handleBlurQuantity({ event, itemShare })}
                defaultValue={itemShare.qntShare}
              />
            </td>
            <td>R$ {itemShare.price}</td>
            <td>R$ {itemShare.currentHeritage}</td>
            <td>{itemShare.currentParticipation}%</td>
            <td>
              <input
                type="number"
                placeholder="Ex.: 1%"
                onBlur={event => handleBlurObjective({ event, itemShare })}
                defaultValue={itemShare.qntWanted}
              />
            </td>
            <td>{itemShare.distanceFromQntWanted}%</td>
            <td>{itemShare.suggestion}</td>
          </tr>
        )
      })
    }
  }

  const renderTableShares = () => {
    return (
      <div className="table-wrapper">
        <table className="wallet-content-table">
          <tr>
            <th>Ativo</th>
            <th>Setor</th>
            <th>Quantidade</th>
            <th>Cotação</th>
            <th>Patrimônio</th>
            <th>Participação</th>
            <th>Objetivo</th>
            <th>Distância do objetivo</th>
            <th>Quantas ações comprar?</th>
          </tr>
          {renderRows()}
        </table>
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
