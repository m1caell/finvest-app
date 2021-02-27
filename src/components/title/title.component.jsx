import React from 'react'
import PropTypes from 'prop-types'

import './title.component.scss'

const TitleComponent = ({ children, className, ...props }) => {
  return (
    <h1 className={`app-title ${className}`} {...props}>
      {children}
    </h1>
  )
}

TitleComponent.defaultProps = {
  className: ''
}

TitleComponent.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string
}

export { TitleComponent }
