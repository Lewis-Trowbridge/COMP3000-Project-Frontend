import { Marker, Popup, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import useBackend from '../utils/useBackend'
import Reading from './Reading'

const Stations = () => {
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

  const { data } = useBackend({ bbox: bounds })

  return (
    <div>
      {data.map((reading) => (
        <Marker key={reading.station.name} position={reading.station.coordinates}>
          <Popup>
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

export default Stations
