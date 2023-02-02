import { useMemo, useState } from 'react'
import { useMapEvents } from 'react-leaflet'
import PropTypes from 'prop-types'
import ReadingContext from '../utils/ReadingContext'
import useBackend from '../utils/useBackend'

const ReadingProvider = ({ children }) => {
  const [date, setDate] = useState(new Date())
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
    <ReadingContext.Provider
      value={useMemo(() => ({ data, date, setDate }), [data, date, setDate])}
    >
      {children}
    </ReadingContext.Provider>
  )
}

ReadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ReadingProvider
