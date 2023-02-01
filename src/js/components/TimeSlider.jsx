import { useMemo, useEffect, useState } from 'react'
import { LEAFLET_POSITION_CLASSES, TIME_VALUES } from '../constants'

const TimeSlider = () => {
  const [now] = useState(new Date())
  const upperBound = useMemo(() => (now.getTime() + TIME_VALUES.THREE_YEARS_IN_MS), [now])
  const [date, setDate] = useState(now)
  const [unixTimestamp, setUnixTimestamp] = useState(Math.floor(Date.now()))

  useEffect(() => {
    setDate(new Date(unixTimestamp))
  }, [unixTimestamp])

  return (
    <div className={LEAFLET_POSITION_CLASSES.bottomleft}>
      <div className="leaflet-control leaflet-bar">
        <div style={{ backgroundColor: 'white', height: '100px', width: '100px' }}>
          <input
            type="range"
            min={TIME_VALUES.JAN_1_1990_UNIX_TIMESTAMP}
            max={upperBound}
            value={unixTimestamp}
            onChange={(event) => { setUnixTimestamp(event.target.valueAsNumber) }}
            name="time"
          />
          <p>{date.toString()}</p>
        </div>
      </div>
    </div>
  )
}

export default TimeSlider
