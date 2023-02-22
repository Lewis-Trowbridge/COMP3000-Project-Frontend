import { useContext } from 'react'
import Toggle from 'react-toggle'
import ReadingContext from '../utils/ReadingContext'
import { LEAFLET_POSITION_CLASSES, METRICS } from '../constants'

import 'react-toggle/style.css'

const boolToMetric = {
  false: METRICS.AIR_QUALITY,
  true: METRICS.TEMPERATURE,
}

const MetricSwapper = () => {
  const { setMetric } = useContext(ReadingContext)

  const updateMetric = (checked) => {
    setMetric(boolToMetric[checked])
  }

  return (
    <div className={`${LEAFLET_POSITION_CLASSES.topleft}`}>
      <div className="leaflet-bar leaflet-control no-outline-box">
        <p>Hello</p>
        <Toggle
          defaultChecked={false}
          onChange={(event) => { updateMetric(event.target.checked) }}
          aria-label="Display"
        />
      </div>
    </div>
  )
}

export default MetricSwapper
