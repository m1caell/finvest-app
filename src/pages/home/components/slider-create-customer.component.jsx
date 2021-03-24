import { useState } from 'react'
import {
  TextField,
  Button,
} from '@material-ui/core'
import { TitleComponent } from '@components'
import Alert from '@material-ui/lab/Alert'
import { useHomePage } from '../home.hook'
import PropTypes from 'prop-types'
import { serializeCPF, serializePhone,  getOnlyNumbers } from '@utils/index'


export const SliderCreateCustomer = ({
  setIsOpenDrawer,
  onSuccessMessage,
  loadCustomers
}) => {
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')
 
  const onCloseCreateCustomerSlider = () => {
    setIsOpenDrawer(false)
    onSuccessMessage(true)
    loadCustomers()
  }

  const { doSubmitCustomer, error } = useHomePage({
    onCloseCreateCustomerSlider
  })

  const onSubmit = event => {
    event.preventDefault()
    const form = event && event.target

    doSubmitCustomer({
      fullName: form.fullName.value,
      email: form.email.value,
      cpf: form.cpf.value,
      identity: form.identity.value,
      phone: form.phone.value,
      address: form.address.value
    })
  }

  const renderError = () =>
    error ? <Alert severity="error">{error}</Alert> : null

  const handleChangeCpf = event => {
    const value = event?.target?.value
    setCpf(serializeCPF(value))
  }

  const handleChangePhone = event => {
    const value = event?.target?.value
    setPhone(serializePhone(value))
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
            placeholder="Ex.: joao@gmail.com"
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
            id="identity"
            label="RG"
            type="text"
            variant="outlined"
            placeholder="xxxxxxxxxx"
            inputProps={{ maxLength: 10 }}
          />
        </div>
        
        <div className="form-row">
          <TextField
            id="phone"
            label="Celular"
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
            label="Endereço"
            type="text"
            variant="outlined"
            inputProps={{ maxLength: 200 }}
          />
        </div>

        <div className="form-row">
          <TextField
            id="password"
            label="Pré-senha"
            type="text"
            variant="outlined"
            disabled
            value={getOnlyNumbers(cpf)}
            inputProps={{ maxLength: 50 }}
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
