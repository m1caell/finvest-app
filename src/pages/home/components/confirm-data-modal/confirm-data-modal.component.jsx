import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  TextField,
  Button,
  InputAdornment,
  IconButton
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert'
import { useHomePage } from '../../home.hook'
import { useAuthService } from '@services/index'
import { serializePhone } from '@utils/index'

import './confirm-data-modal.component.scss'

export const ConfirmDataModal = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false)

  const { loggedUser } = useAuthService()

  const [phone, setPhone] = useState(loggedUser?.phone || '')
  

  const onSuccessDataConfirmation = () => {
    onSuccess()
  }

  const { doConfirmData, error } = useHomePage({ onSuccessDataConfirmation })

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = event => {
    event.preventDefault()
    const form = event && event.target

     doConfirmData({
      fullName: form.fullName.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      password: form.password.value
    })
  }

  const handleChangePhone = event => {
    const value = event?.target?.value
    setPhone(serializePhone(value))
  }


  const renderError = () =>
    error ? <Alert severity="error">{error}</Alert> : null

  return (
    <form onSubmit={onSubmit} className="confirm-data-modal" noValidate>
      <div className="form-row">
        <TextField
          id="fullName"
          label="Nome completo"
          type="text"
          variant="outlined"
          defaultValue={loggedUser?.name || ''}
          inputProps={{ maxLength: 200 }}
        />
      </div>

      <div className="form-row">
        <TextField
          id="email"
          label="E-mail"
          type="text"
          variant="outlined"
          defaultValue={loggedUser?.email || ''}
          inputProps={{ maxLength: 100 }}
        />
      </div>
      <div className="form-row">
        <TextField
          id="phone"
          label="Telefone"
          type="tel"
          variant="outlined"
          value={phone}
          onChange={handleChangePhone}
          placeholder="(xx)-xxxxx-xxxx"
          inputProps={{ maxLength: 16 }}
        />
      </div>

      <div className="form-row">
        <TextField
          id="address"
          label="Endereço completo"
          type="text"
          variant="outlined"
          defaultValue={loggedUser?.address || ''}
          inputProps={{ maxLength: 200 }}
        />
      </div>

      <div className="form-row">
        <TextField
          id="password"
          label="Nova senha"
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
        <Button type="submit" color="primary">
          Confirmar
        </Button>
      </div>
    </form>
  )
}

ConfirmDataModal.propTypes = {
  onSuccess: PropTypes.func.isRequired
}
