import { useContext, useMemo, useState } from 'react'
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
  const [checked, setChecked] = useState(false)

  useMemo(() => {
    setMetric(boolToMetric[checked])
  }, [checked, setMetric])

  return (
    <div className={`${LEAFLET_POSITION_CLASSES.topleft}`}>
      <div className="leaflet-bar leaflet-control no-outline-box">
        <Toggle
          defaultChecked={checked}
          onChange={(event) => { setChecked(event.target.checked) }}
          aria-label={`Display ${boolToMetric[!checked]}`}
        />
      </div>
    </div>
  )
}

export default MetricSwapper
