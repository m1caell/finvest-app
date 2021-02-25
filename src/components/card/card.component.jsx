import React from 'react'
import PropTypes from 'prop-types'

import './card.component.scss'

const CardComponent = ({ children, className, ...props }) => {
  return (
    <div className={`app-card ${className}`} {...props}>
      {children}
    </div>
  )
}

CardComponent.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
}

export { CardComponent }
