import { TextField, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { ReactComponent as FinvestLogo } from '@static/finvest-logo.svg'
import { useLoginPage } from './login.hook'

import './login.page.scss'

function LoginPage() {
  const { doLogin, error } = useLoginPage()

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
          <FinvestLogo />
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
    </div>
  )
}

export { LoginPage }
