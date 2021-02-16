import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Route, useHistory } from 'react-router-dom'
import { useAuthService } from '@services'

export const PublicRoute = ({ component: Component, ...rest }) => {
  const { loggedUser } = useAuthService()
  const history = useHistory()

  useEffect(() => {
    if (loggedUser) {
      history.push('/')
    }
  }, [])

  return <Route {...rest} render={props => <Component {...props} />} />
}

PublicRoute.propTypes = {
  component: PropTypes.any.isRequired
}
