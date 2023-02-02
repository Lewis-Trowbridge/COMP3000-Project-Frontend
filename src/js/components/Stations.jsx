import { Marker, Popup, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import PropTypes from 'prop-types'
import useBackend from '../utils/useBackend'
import Reading from './Reading'

const Stations = ({ date }) => {
  const [bounds, setBounds] = useState({})
  const map = useMapEvents({
    load: () => {
      const mapBounds = map.getBounds()
      setBounds({
        bottomLeftX: mapBounds.getSouthWest().lat,
        bottomLeftY: mapBounds.getSouthWest().lng,
        topRightX: mapBounds.getNorthEast().lat,
        topRightY: mapBounds.getNorthEast().lng,
      })
    },
    moveend: () => {
      const mapBounds = map.getBounds()
      setBounds({
        bottomLeftX: mapBounds.getSouthWest().lat,
        bottomLeftY: mapBounds.getSouthWest().lng,
        topRightX: mapBounds.getNorthEast().lat,
        topRightY: mapBounds.getNorthEast().lng,
      })
    },
  })

  const sameDay = (newDate) => {
    const now = new Date()
    return newDate.getUTCDate() === now.getUTCDate()
          && newDate.getUTCMonth() === now.getUTCMonth()
          && newDate.getUTCFullYear() === now.getUTCFullYear()
  }

  const { data } = useBackend({
    bbox: bounds,
    timestamp: sameDay(date) ? null : date.toISOString(),
  })

  return (
    <div>
      {data.map((reading) => (
        <Marker key={reading.station.name} position={reading.station.coordinates}>
          <Popup attribution={reading.licenseInfo}>
            <Reading
              name={reading.station.name}
              unit={reading.unit}
              value={reading.value}
              timestamp={reading.timestamp}
            />
          </Popup>
        </Marker>
      ))}
    </div>
  )
}

Stations.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
}

export default Stations
