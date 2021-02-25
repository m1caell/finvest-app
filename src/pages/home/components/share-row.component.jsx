
import PropTypes from 'prop-types'

const ShareRow = ({ data }) => {
  if (data) {
    return (
      <div className="share-row">
        <div className="share-row-info">
          <div>{data.code}</div>
          <div>{data.price}</div>
          <div>{data.amount}</div>
          <div>{data.patrimony}</div>
          <div>{data.percentage}</div>
        </div>
        <div className="share-row-controls">
          {/* TODO: add controls to list edit and remove */}
        </div>
      </div>
    )
  }
}

ShareRow.propTypes = {
  data: PropTypes.object.isRequired
}

export { ShareRow }
