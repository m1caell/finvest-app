import { useMemo, useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { CardComponent, TitleComponent } from '@components/index'
import PropTypes from 'prop-types'

import './wallet-content.style.scss'

const WalletContent = ({ wallet }) => {
  const [rows, setRows] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)

  useEffect(() => {
    if (wallet?.walletShareList) {
      const rowsPrepared = prepareRows()
      setRows(rowsPrepared)
    }
  }, [wallet])

  const prepareRows = () => {
    return wallet.walletShareList.map(
      ({ walletShareId, share, qntShare, qntWanted }, key) => {
        return {
          id: key,
          walletShareId,
          share,
          qntShare,
          qntWanted,
          sector: 'Commodities de petróleo',
          price: 50,
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

  return wallet ? (
    <CardComponent className="wallet-content">
      <header className="wallet-content-header">
        <TitleComponent>
          Carteira: <strong>{wallet.name}</strong>
        </TitleComponent>
        <div className="header-controls">
          <Button variant="contained">Adicionar ação</Button>
          <Button variant="contained">Editar carteira</Button>
        </div>
      </header>
      <div className="wallet-content-main">{renderTableShares()}</div>
    </CardComponent>
  ) : null
}

WalletContent.propTypes = {
  wallet: PropTypes.object
}

export { WalletContent }
