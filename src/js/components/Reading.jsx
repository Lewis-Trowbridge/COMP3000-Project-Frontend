import PropTypes from 'prop-types'

const Reading = ({
  name, value, unit, timestamp,
}) => (
  <div className="reading">
    <span>{name}</span>
    <br />
    <span>
      {value}
      {' '}
      {unit}
    </span>
    <br />
    <span>{new Date(Date.parse(timestamp)).toUTCString()}</span>
  </div>
)

Reading.propTypes = {
  name: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}

export default Reading
