import PropTypes from 'prop-types'

const Reading = ({
  name, value, unit, timestamp,
}) => (
  <div className="reading">
    <p>{name}</p>
    <br />
    <p>
      {value}
      {' '}
      {unit}
    </p>
    <br />
    <p>{new Date(Date.parse(timestamp)).toUTCString()}</p>
  </div>
)

Reading.propTypes = {
  name: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,

}

export default Reading
