import React from 'react'
import PropTypes from 'prop-types'

import './card.component.scss'

const CardComponent = ({ children, ...props }) => {
  return (
    <div className="app-card" {...props}>
      {children}
    </div>
  )
}

CardComponent.propTypes = {
  children: PropTypes.any
}

export { CardComponent }
