import L from 'leaflet'
import {
  useRef, useMemo, useEffect, useState,
} from 'react'
import PropTypes from 'prop-types'
import { LEAFLET_POSITION_CLASSES, TIME_VALUES } from '../constants'

const TimeSlider = ({ date, setDate }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      L.DomEvent.disableClickPropagation(ref.current)
    }
  })

  const [now] = useState(new Date())
  const upperBound = useMemo(() => (now.getTime() + TIME_VALUES.THREE_YEARS_IN_MS), [now])
  const [unixTimestamp, setUnixTimestamp] = useState(Math.floor(Date.now()))

  useEffect(() => {
    setDate(new Date(unixTimestamp))
  }, [setDate, unixTimestamp])

  return (
    <div ref={ref} className={LEAFLET_POSITION_CLASSES.bottomleft}>
      <div className="leaflet-control leaflet-bar">
        <div className="slider">
          <input
            type="range"
            min={TIME_VALUES.JAN_1_1990_UNIX_TIMESTAMP}
            max={upperBound}
            defaultValue={unixTimestamp}
            onMouseUp={(event) => { setUnixTimestamp(event.target.valueAsNumber) }}
            onTouchEnd={(event) => { setUnixTimestamp(event.target.valueAsNumber) }}
            onKeyUp={(event) => { setUnixTimestamp(event.target.valueAsNumber) }}
            aria-label="time"
          />
          <p>{date.toString()}</p>
        </div>
      </div>
    </div>
  )
}

TimeSlider.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  setDate: PropTypes.func.isRequired,
}

export default TimeSlider
