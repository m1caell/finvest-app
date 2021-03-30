import { useEffect, useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { ReactComponent as FinvestLogoText } from '@static/logo-text.svg'
import { ReactComponent as FinvestLogo } from '@static/logo.svg'
import { useLoginPage } from './login.hook'
import { useLocation } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'

import './login.page.scss'

function LoginPage() {
  const { doLogin, error } = useLoginPage()
  const [snackError, setSnackError] = useState('')
  const location = useLocation()

  useEffect(() => {
    if (location.search === '?authorizationFail=true') {
      setSnackError('Seu token expirou, faça login novamente.')
    } else {
      setSnackError('')
    }
  }, [])

  const onSubmit = event => {
    event.preventDefault()
    const form = event && event.target

    if (form) {
      const { email, password } = form
      doLogin({ email: email.value, password: password.value })
    }
  }

  const renderError = () =>
    error ? <Alert severity="error">{error}</Alert> : null

  return (
    <div>
      <div className="login-page">
        <aside className="login-page-form">
          <FinvestLogo className="logo" />
          <FinvestLogoText className="logo-text" />
          <form onSubmit={onSubmit} className="form" noValidate>
            <h2 className="form-title">Login</h2>

            <div className="form-row">
              <TextField
                id="email"
                label="E-mail"
                type="email"
                variant="outlined"
                inputProps={{ maxLength: 100 }}
              />
            </div>

            <div className="form-row">
              <TextField
                id="password"
                label="Senha"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                inputProps={{ maxLength: 50 }}
              />
            </div>

            {renderError()}

            <div className="form-row">
              <Button type="submit" variant="contained" color="primary">
                Acessar
              </Button>
            </div>
          </form>
        </aside>
        <div className="login-page-image" />
      </div>
      <Snackbar
        open={!!snackError}
        autoHideDuration={6000}
        onClose={() => setSnackError('')}
      >
        <Alert onClose={() => setSnackError('')} severity="error">
          {snackError}
        </Alert>
      </Snackbar>
    </div>
  )
}

export { LoginPage }
