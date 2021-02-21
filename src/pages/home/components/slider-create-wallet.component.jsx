
import {
  TextField,
  Button,
} from '@material-ui/core'
import { TitleComponent } from '@components'
import Alert from '@material-ui/lab/Alert'
import { useHomePage } from '../home.hook'
import PropTypes from 'prop-types'


export const SliderCreateWallet = ({
  setIsOpenDrawer,
  onSuccessMessage,
  loadWallets
}) => {

  const onCloseCreateWalletSlider = () => {
    setIsOpenDrawer(false)
    onSuccessMessage(true)
    loadWallets()
  }

  const { doSubmit, error } = useHomePage({ onCloseCreateWalletSlider })

  const onSubmit = event => {
    event.preventDefault()
    const form = event && event.target

    doSubmit({
      name: form.name.value,
      description: form.description.value,
    })
  }

  const renderError = () =>
    error ? <Alert severity="error">{error}</Alert> : null

  return (
    <div className="slider-create-wallet">
      <TitleComponent>Cadastrar Carteira</TitleComponent>
      <form onSubmit={onSubmit} className="form" noValidate>
        <div className="form-row">
          <TextField
            id="name"
            label="Nome da Carteira"
            type="text"
            variant="outlined"
            inputProps={{ maxLength: 200 }}
          />
        </div>

        <div className="form-row">
          <TextField
            id="description"
            label="Descrição"
            type="text"
            variant="outlined"
            inputProps={{ maxLength: 200 }}
          />
        </div>

       
        

        {renderError()}

        <div className="divider"></div>

        <div className="buttons">
          <Button type="submit" variant="contained">
            Salvar
          </Button>
          <Button onClick={() => setIsOpenDrawer(false)} variant="contained">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}

SliderCreateWallet.propTypes = {
  setIsOpenDrawer: PropTypes.func,
  onSuccessMessage: PropTypes.func,
  loadWallets: PropTypes.func
}
