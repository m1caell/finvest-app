import { TextField, Button } from '@material-ui/core'
import { TitleComponent } from '@components'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

const WALLET_URL = '/home/wallet/'

export const SliderCreateShare = ({
  setIsOpenDrawer,
  doSubmitShare,
  error
}) => {
  const location = useLocation()

  const onSubmit = event => {
    event.preventDefault()
    const form = event && event.target

    const isWalletUrl = location.pathname.includes(WALLET_URL)
    const urlWalletId = Number(location.pathname.replace(WALLET_URL, ''))

    if (isWalletUrl && urlWalletId) {
      doSubmitShare({
        share: form.shareCode.value?.toUpperCase(),
        walletId: urlWalletId
      })
    }
  }

  const renderError = () =>
    error ? <Alert severity="error">{error}</Alert> : null

  return (
    <div className="slider-create-share">
      <TitleComponent>Adicionar Ativo</TitleComponent>
      <form onSubmit={onSubmit} className="form" noValidate>
        <div className="form-row">
          <TextField
            id="shareCode"
            label="Código do ativo"
            type="text"
            variant="outlined"
            inputProps={{ maxLength: 10 }}
          />
        </div>

        {renderError()}

        <div className="divider"></div>

        <div className="buttons">
          <Button type="submit" variant="contained">
            Salvar
          </Button>
          <Button onClick={() => setIsOpenDrawer(false)} variant="contained">
            Voltar
          </Button>
        </div>
      </form>
    </div>
  )
}

SliderCreateShare.propTypes = {
  setIsOpenDrawer: PropTypes.func,
  onSuccessMessage: PropTypes.func,
  loadShares: PropTypes.func,
  doSubmitShare: PropTypes.func,
  error: PropTypes.string
}
