import { useAuthService } from '@services'
import { useHistory } from 'react-router-dom'
import loginImage from '@static/login-image.jpg'
import { TextField, Button } from '@material-ui/core'
import { ReactComponent as FinvestLogo } from '@static/finvest-logo.svg'

import './login.page.scss'

function LoginPage() {
  const { signin } = useAuthService()
  const history = useHistory()

  const doLogin = async () => {
    await signin()
    history.push('/')
  }

  return (
    <div>
      <div className="login-page">
        <aside className="login-page-form">
          <FinvestLogo />
          <form onSubmit={doLogin} className="form" noValidate>
            <h2 className="form-title">Login</h2>

            <div className="form-row">
              <TextField
                id="email"
                label="E-mail"
                variant="outlined"
                inputProps={{ maxlength: 100 }}
              />
            </div>

            <div className="form-row">
              <TextField
                id="password"
                label="Senha"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                inputProps={{ maxlength: 50 }}
              />
            </div>

            <div className="form-row">
              <Button type="submit" variant="contained" color="primary">
                Acessar
              </Button>
            </div>
          </form>
        </aside>
        <img
          className="login-page-image"
          src={loginImage}
          alt="Imagem de analista de finanças com seta de crescimento"
        />
      </div>
    </div>
  )
}

export { LoginPage }
