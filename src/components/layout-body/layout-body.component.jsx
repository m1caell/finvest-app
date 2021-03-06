import PropTypes from 'prop-types'
import { HeaderComponent } from '@components/header/header.component'
import { MenuComponent } from '@components/menu/menu.component'

import './layout-body.component.scss'

const LayoutBodyComponent = ({ children }) => {
  return (
    <div className="main-layout">
      <div className="main-layout-fixed">
        <HeaderComponent />
        <MenuComponent />
      </div>
      <div className="main-layout-content">{children}</div>
    </div>
  )
}

LayoutBodyComponent.propTypes = {
  children: PropTypes.any.isRequired
}

export { LayoutBodyComponent }
