import { useState } from 'react'
import {
  TextField,
  Button,
  InputAdornment,
  IconButton
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { TitleComponent } from '@components'
import Alert from '@material-ui/lab/Alert'
import { useHomePage } from '../home.hook'
import PropTypes from 'prop-types'
import { serializeCPF } from '@utils/index'

export const SliderCreateCustomer = ({
  setIsOpenDrawer,
  onSuccessMessage,
  loadCustomers
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [cpf, setCpf] = useState('')

  const onCloseCreateCustomerSlider = () => {
    setIsOpenDrawer(false)
    onSuccessMessage(true)
    loadCustomers()
  }

  const { doSubmitCustomer, error } = useHomePage({ onCloseCreateCustomerSlider })

  const onSubmit = event => {
    event.preventDefault()
    const form = event && event.target

    doSubmitCustomer({
      fullName: form.fullName.value,
      email: form.email.value,
      cpf: form.cpf.value,
      password: form.password.value
    })
  }

  const renderError = () =>
    error ? <Alert severity="error">{error}</Alert> : null

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleChangeCpf = event => {
    const value = event?.target?.value
    setCpf(serializeCPF(value))
  }

  return (
    <div className="slider-create-customer">
      <TitleComponent>Cadastrar cliente</TitleComponent>
      <form onSubmit={onSubmit} className="form" noValidate>
        <div className="form-row">
          <TextField
            id="fullName"
            label="Nome completo"
            type="text"
            variant="outlined"
            inputProps={{ maxLength: 200 }}
          />
        </div>

        <div className="form-row">
          <TextField
            id="email"
            label="E-mail"
            type="text"
            variant="outlined"
            inputProps={{ maxLength: 100 }}
          />
        </div>

        <div className="form-row">
          <TextField
            id="cpf"
            label="CPF"
            type="text"
            variant="outlined"
            value={cpf}
            onChange={handleChangeCpf}
            placeholder="xxx.xxx.xxx-xx"
            inputProps={{ maxLength: 14 }}
          />
        </div>

        <div className="form-row">
          <TextField
            id="password"
            label="Pré-senha"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            inputProps={{
              maxLength: 50
            }}
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

SliderCreateCustomer.propTypes = {
  setIsOpenDrawer: PropTypes.func,
  onSuccessMessage: PropTypes.func,
  loadCustomers: PropTypes.func
}
