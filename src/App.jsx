import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { PublicRoute, PrivateRoute } from '@routes'
import { LoginPage, HomePage } from '@pages'
import { AuthProvider, WalletProvider } from '@services'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { ptBR } from '@material-ui/core/locale'

import '@styles/app.scss'

const theme = createMuiTheme(
  {
    palette: {
      primary: { main: '#1976d2' }
    }
  },
  ptBR
)

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <WalletProvider>
            <Router>
              <Switch>
                <PublicRoute path="/login" component={LoginPage} />
                <PrivateRoute path="/" component={HomePage} />
                <PrivateRoute path="/wallet/:id" component={HomePage} />
              </Switch>
            </Router>
          </WalletProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
