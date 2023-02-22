import {
  useContext, useEffect, useState,
} from 'react'
import Toggle from 'react-toggle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

  useEffect(() => {
    setMetric(boolToMetric[checked])
  }, [checked, setMetric])

  return (
    <div className={`${LEAFLET_POSITION_CLASSES.topleft} switcher-box`}>
      <div className="leaflet-bar leaflet-control no-outline-box">
        <Toggle
          defaultChecked={checked}
          onChange={(event) => { setChecked(event.target.checked) }}
          aria-label={`Display ${boolToMetric[!checked]}`}
          icons={{
            checked: <FontAwesomeIcon icon="fa-solid fa-wind" inverse />,
            unchecked: <FontAwesomeIcon icon="fa-solid fa-temperature-half" inverse />,
          }}
        />
      </div>
    </div>
  )
}

export default MetricSwapper
