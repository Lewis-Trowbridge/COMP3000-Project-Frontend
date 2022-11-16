import { useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import useBackend from '../utils/useBackend'

function Stations() {
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

  // eslint-disable-next-line no-unused-vars
  const { data } = useBackend({ bbox: bounds })
}

export default Stations
