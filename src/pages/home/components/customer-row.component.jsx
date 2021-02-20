import { serializeCPF } from '@utils/'
import PropTypes from 'prop-types'

const CustomerRow = ({ data }) => {
  if (data) {
    return (
      <div className="customer-row">
        <div className="customer-row-info">
          <div>{serializeCPF(data.cpf)}</div>
          <div>{data.fullName}</div>
        </div>
        <div className="customer-row-controls">
          {/* TODO: add controls to list edit and remove */}
        </div>
      </div>
    )
  }
}

CustomerRow.propTypes = {
  data: PropTypes.object.isRequired
}

export { CustomerRow }
