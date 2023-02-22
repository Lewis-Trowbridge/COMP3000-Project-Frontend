import { useEffect, useMemo, useState } from 'react'
import { useMapEvents } from 'react-leaflet'
import PropTypes from 'prop-types'
import ReadingContext from '../utils/ReadingContext'
import useBackend from '../utils/useBackend'
import { METRICS } from '../constants'

const ReadingProvider = ({ children }) => {
  const [selected, setSelected] = useState()
  const [date, setDate] = useState(new Date())
  const [bounds, setBounds] = useState()
  const [metric, setMetric] = useState(METRICS.AIR_QUALITY)
  const map = useMapEvents({
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

  useEffect(() => {
    const updated = data.find((item) => item.station.name === selected?.station.name)
    setSelected(updated)
  }, [selected, setSelected, data])

  // Create markers on load:
  // https://github.com/PaulLeCam/react-leaflet/issues/46
  // https://stackoverflow.com/questions/67967145/how-to-place-on-load-event-handler-with-react-leaflet
  useEffect(() => {
    const mapBounds = map.getBounds()
    setBounds({
      bottomLeftX: mapBounds.getSouthWest().lat,
      bottomLeftY: mapBounds.getSouthWest().lng,
      topRightX: mapBounds.getNorthEast().lat,
      topRightY: mapBounds.getNorthEast().lng,
    })
  }, [map])

  return (
    <ReadingContext.Provider
      value={useMemo(() => ({
        data, date, metric, selected, setDate, setMetric, setSelected,
      }), [data, date, metric, selected, setDate, setMetric, setSelected])}
    >
      {children}
    </ReadingContext.Provider>
  )
}

ReadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ReadingProvider
