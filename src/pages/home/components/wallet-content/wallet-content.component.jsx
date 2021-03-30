import { useState, useEffect } from 'react'
import {
  Button,
  TextField,
  Modal,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle
} from '@material-ui/core/'
import { Alert, AlertTitle } from '@material-ui/lab'
import Snackbar from '@material-ui/core/Snackbar'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { CardComponent, TitleComponent } from '@components/index'
import { SliderCreateShare } from '@pages/home/components/slider-create-share.component'
import { useWalletService } from '@services/'
import { TrendingUp } from '@material-ui/icons'
import PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete'
import { useHistory } from 'react-router-dom'

import './wallet-content.style.scss'

const SHARE_CREATION_SUCCESS_MESSAGE = {
  text: 'Ação adicionada com sucesso.',
  type: 'success'
}

const QNT_WANTED_BIGGER_THAN_100_PERCENT = {
  text: 'A soma de seu objetivo ultrapassa 100%',
  type: 'warning'
}

const UPDATE_WALLET_SHARES_SUCCESS_MESSAGE = {
  text: 'Carteira atualizada com sucesso.',
  type: 'success'
}

const UPDATE_WALLET_SHARES_FAIL_MESSAGE = {
  text: 'Ocorreu um erro ao atualizar.',
  type: 'error'
}

let agreeFunction = () => {}

const WalletContent = ({
  currentWalletId,
  rows = [],
  rowsFiltered = [],
  setRows,
  doSubmitShare,
  error,
  doUpdateWalletShares,
  valueToSimulate,
  setValueToSimulate,
  doSimulateCalc,
  rest,
  filterBySector,
  setFilterBySector,
  removeShareFromList
}) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState(null)
  const [wantedAlertMessage, setWantedAlertMessage] = useState(null)
  const [values, setValues] = useState({})
  const [someValueChange, setSomeValueChange] = useState(false)
  const [openHistoryModal, setOpenHistoryModal] = useState(false)
  const [historyData, setHistoryData] = useState(null)
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  const {
    selectedWallet,
    setWallet,
    getCalculateShares,
    deleteWallet,
    getLogs
  } = useWalletService()
  const history = useHistory()

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
      const calculatedRows = getCalculateShares(rowsPrepared)

      setRows(calculatedRows)
      setSomeValueChange(false)
    }
  }, [selectedWallet])

  useEffect(() => {
    checkWantedQuantity()
  }, [rows])

  const checkWantedQuantity = () => {
    if (rows.length) {
      let wantedTotal = 0

      rows.forEach(element => {
        wantedTotal += element.qntWanted
      })

      if (wantedTotal > 100) {
        setWantedAlertMessage(QNT_WANTED_BIGGER_THAN_100_PERCENT)
      } else {
        setWantedAlertMessage(null)
      }
    }
  }

  const prepareRows = () => {
    const valuesInitialState = {}
    const list = selectedWallet.walletShareList.map(
      (
        {
          walletShareId,
          share = '-',
          qntShare = 0,
          qntWanted = 0,
          sector = 'Sem informação a exibir',
          price = 'Falha',
          currentParticipation = 0,
          distanceFromQntWanted = 0,
          suggestion = 0
        },
        key
      ) => {
        valuesInitialState[`qntShare${walletShareId}`] = qntShare
        valuesInitialState[`qntWanted${walletShareId}`] = qntWanted

        return {
          walletShareId,
          share,
          qntShare,
          qntWanted,
          sector,
          price,
          currentHeritage: price * qntShare,
          currentParticipation,
          distanceFromQntWanted,
          suggestion
        }
      }
    )

    setValues(valuesInitialState)
    return list
  }

  const updateRows = rows => {
    const sharesList = getCalculateShares(rows)
    setRows(sharesList)
  }

  const handleBlurQuantity = ({ event, itemShare }) => {
    event.preventDefault()

    if (itemShare.qntShare !== Number(event.target.value)) {
      itemShare.qntShare = Number(event.target.value)

      updateRows(rows)
    }
  }

  const handleBlurObjective = ({ event, itemShare }) => {
    event.preventDefault()

    if (itemShare.qntWanted !== Number(event.target.value)) {
      itemShare.qntWanted = Number(event.target.value)

      updateRows(rows)
    }
  }

  const handleChange = (event, valueName) => {
    const newValues = { ...values }
    newValues[valueName] = event.target.value

    setValues(newValues)
    setSomeValueChange(true)
  }

  const onClickUpdateShares = async () => {
    const result = await doUpdateWalletShares({ currentWalletId })

    if (result) {
      setSnackbarMessage(UPDATE_WALLET_SHARES_SUCCESS_MESSAGE)
    } else {
      setSnackbarMessage(UPDATE_WALLET_SHARES_FAIL_MESSAGE)
    }
  }

  const onClickDeleteShare = id => {
    setSomeValueChange(true)
    removeShareFromList(id)
  }

  const onClickDeleteWallet = async id => {
    if (id) {
      const result = await deleteWallet(id)

      if (result) {
        setWallet(null)
        history.push('/home')
      }
    }
  }

  const loadLogs = async () => {
    const histories = await getLogs(currentWalletId)

    if (histories) {
      setHistoryData(histories)
    }
  }

  const onClickHistory = async () => {
    await loadLogs()
    setOpenHistoryModal(true)
  }

  const renderHistoryModal = () => (
    <Modal
      open={openHistoryModal}
      onClose={() => setOpenHistoryModal(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="wallet-history-modal">
        <TitleComponent>Histórico</TitleComponent>
        <div className="wallet-history-modal__items">
          {historyData?.length ? (
            historyData.map(({ description, share }, key) => (
              <Alert key={key} severity="warning">
                <AlertTitle>{share}</AlertTitle>
                {description}
              </Alert>
            ))
          ) : (
            <Alert severity="info">Ainda não há histórico.</Alert>
          )}
        </div>
        <Button onClick={() => setOpenHistoryModal(false)} variant="contained">
          Fechar
        </Button>
      </div>
    </Modal>
  )

  const onClickAgree = async () => {
    await agreeFunction()
    setIsOpenDialog(false)
  }

  const handleDeleteClick = (origin, value) => {
    if (origin === 'share') {
      agreeFunction = () => onClickDeleteShare(value)
    } else if (origin === 'wallet') {
      agreeFunction = () => onClickDeleteWallet(value)
    }

    setIsOpenDialog(true)
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
          Sua ação é irreversível, deseja continuar?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpenDialog(false)} color="primary">
          Voltar
        </Button>
        <Button onClick={onClickAgree} color="primary" autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )

  const renderRows = () => {
    const rowsToShow = filterBySector ? rowsFiltered : rows

    return rowsToShow.map((itemShare, key) => {
      return (
        <tr key={key}>
          <td>{itemShare.share}</td>
          <td>{itemShare.sector}</td>
          <td>
            <input
              id={`qntShare-${key}`}
              name={`qntShare-${key}`}
              type="number"
              placeholder="Ex.: 1"
              onBlur={event => handleBlurQuantity({ event, itemShare })}
              value={values[`qntShare${itemShare.walletShareId}`]}
              onChange={event =>
                handleChange(event, `qntShare${itemShare.walletShareId}`)
              }
            />
          </td>
          <td>R$ {itemShare.price}</td>
          <td>R$ {itemShare.currentHeritage}</td>
          <td>{itemShare.currentParticipation || 0}%</td>
          <td>
            <input
              id={`qntWanted-${key}`}
              name={`qntWanted-${key}`}
              type="number"
              placeholder="Ex.: 1%"
              onBlur={event => handleBlurObjective({ event, itemShare })}
              value={values[`qntWanted${itemShare.walletShareId}`]}
              onChange={event =>
                handleChange(event, `qntWanted${itemShare.walletShareId}`)
              }
              max={100}
              min={0}
            />
          </td>
          <td>
            {itemShare.distanceFromQntWanted || 0}%
            {itemShare?.projectedDistanceFromQntWanted && valueToSimulate ? (
              <div className="wallet-content-table-projected">
                Objetivo projetado: {itemShare.projectedDistanceFromQntWanted}%
              </div>
            ) : null}
          </td>
          <td>
            <div className="wallet-content-table-suggestion">
              {itemShare.suggestion}
              {itemShare.suggestion > 0 ? <TrendingUp /> : null}
            </div>
          </td>
          <td>
            <button
              className="deleteIcon"
              onClick={() =>
                handleDeleteClick('share', itemShare.walletShareId)
              }
            >
              <DeleteIcon />
            </button>
          </td>
        </tr>
      )
    })
  }

  const renderTableShares = () => {
    if (rows.length) {
      return (
        <div className="table-wrapper">
          <div>
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
                <th></th>
              </tr>
              {renderRows()}
            </table>
            {wantedAlertMessage ? (
              <Alert severity={wantedAlertMessage?.type}>
                {wantedAlertMessage?.text}
              </Alert>
            ) : null}
          </div>
          <div className="table-wrapper-button">
            <Button onClick={onClickHistory} variant="contained">
              Histórico
            </Button>
            <Button
              disabled={!someValueChange}
              type="button"
              variant="contained"
              onClick={onClickUpdateShares}
            >
              Salvar alterações
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div className="table-content-empty">
        Ainda não há ações adicionadas nesta carteira.
      </div>
    )
  }

  const renderWithoutWalletSelected = () => (
    <CardComponent>
      <Alert severity="info">
        Selecione ou crie uma carteira para continuar!
      </Alert>
    </CardComponent>
  )

  return selectedWallet ? (
    <CardComponent className="wallet-content">
      <header className="wallet-content-header">
        <TitleComponent>
          Carteira: <strong>{selectedWallet.name}</strong>
          <button
            className="deleteIcon"
            onClick={() => handleDeleteClick('wallet', selectedWallet.walletId)}
          >
            <DeleteIcon />
          </button>
        </TitleComponent>
        <div className="header-controls">
          <Button onClick={() => setIsOpenDrawer(true)} variant="contained">
            Adicionar Ação
          </Button>
        </div>
      </header>
      <div className="share-content-main">
        <div className="share-content-main__header">
          <div className="share-content-main__input-filter">
            <TextField
              name="filterBySector"
              label="Filtro"
              placeholder="Digite o setor"
              type="text"
              variant="outlined"
              inputProps={{ maxLength: 200 }}
              value={filterBySector}
              onChange={e => setFilterBySector(e.target.value)}
            />
          </div>
          <div className="share-content-main__input-buy">
            {rest && rest > 0 && valueToSimulate ? (
              <span>Vai sobrar R$ {rest}</span>
            ) : null}
            <TextField
              name="quantityToBuy"
              label="Simular próxima compra"
              placeholder="Digite o valor"
              type="number"
              variant="outlined"
              inputProps={{ min: 0, maxLength: 200 }}
              value={valueToSimulate}
              onChange={e => setValueToSimulate(e.target.value)}
            />
            <Button
              onClick={doSimulateCalc}
              disabled={!valueToSimulate}
              variant="contained"
            >
              Simular
            </Button>
          </div>
        </div>
        {renderTableShares()}
      </div>
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
              doSubmitShare={doSubmitShare}
              error={error}
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
      {renderHistoryModal()}
      {renderDialog()}
    </CardComponent>
  ) : (
    renderWithoutWalletSelected()
  )
}

WalletContent.propTypes = {
  currentWalletId: PropTypes.number,
  rows: PropTypes.array.isRequired,
  setRows: PropTypes.func.isRequired,
  doSubmitShare: PropTypes.func.isRequired,
  error: PropTypes.string,
  doUpdateWalletShares: PropTypes.func.isRequired,
  valueToSimulate: PropTypes.any.isRequired,
  setValueToSimulate: PropTypes.func.isRequired,
  doSimulateCalc: PropTypes.func.isRequired,
  rest: PropTypes.any,
  setRest: PropTypes.func.isRequired,
  filterBySector: PropTypes.string,
  setFilterBySector: PropTypes.func.isRequired,
  rowsFiltered: PropTypes.array,
  removeShareFromList: PropTypes.func.isRequired
}

export { WalletContent }
