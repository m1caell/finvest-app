import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuthService } from '@services'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useAuthService()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth?.user ? (
          <Route {...rest} render={props => <Component {...props} />} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired
}

export { PrivateRoute }
