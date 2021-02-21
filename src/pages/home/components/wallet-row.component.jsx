
import PropTypes from 'prop-types'

const WalletRow = ({ data }) => {
  if (data) {
    return (
      <div className="wallet-row">
        <div className="wallet-row-info">
          <div>{data.name}</div>
          <div>{data.description}</div>
        </div>
        <div className="wallet-row-controls">
          {/* TODO: add controls to list edit and remove */}
        </div>
      </div>
    )
  }
}

WalletRow.propTypes = {
  data: PropTypes.object.isRequired
}

export { WalletRow }
