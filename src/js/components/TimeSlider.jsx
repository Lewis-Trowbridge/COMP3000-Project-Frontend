import L from 'leaflet'
import {
  useRef, useMemo, useEffect, useState,
  useContext,
} from 'react'
import { LEAFLET_POSITION_CLASSES, TIME_VALUES } from '../constants'
import ReadingContext from '../utils/ReadingContext'

const TimeSlider = () => {
  const { date, setDate } = useContext(ReadingContext)
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      L.DomEvent.disableClickPropagation(ref.current)
    }
  })

  const [now] = useState(new Date())
  const upperBound = useMemo(() => (now.getTime() + TIME_VALUES.THREE_YEARS_IN_MS), [now])
  const [unixTimestamp, setUnixTimestamp] = useState(Math.floor(now.getTime()))

  useEffect(() => {
    setDate(new Date(unixTimestamp))
  }, [setDate, unixTimestamp])

  return (
    <div ref={ref} className={`${LEAFLET_POSITION_CLASSES.bottomleft} time-slider`}>
      <div className="leaflet-control leaflet-bar">
        <div className="control-box">
          <input
            type="range"
            min={TIME_VALUES.JAN_1_1990_UNIX_TIMESTAMP}
            max={upperBound}
            step={TIME_VALUES.ONE_HOUR_IN_MS}
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

export default TimeSlider
