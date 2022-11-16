import { Marker, useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import useBackend from '../utils/useBackend'

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
      {data.map(({ station }) => <Marker key={station.name} position={station.coordinates} />)}
    </div>
  )
}

export default Stations
