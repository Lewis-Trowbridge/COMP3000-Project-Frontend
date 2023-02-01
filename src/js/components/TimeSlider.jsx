import { LEAFLET_POSITION_CLASSES } from '../constants'

const TimeSlider = () => {
  const now = new Date()

  console.log(now)

  return (
    <div className={LEAFLET_POSITION_CLASSES.bottomleft}>
      <div className="leaflet-control leaflet-bar">
        <div style={{ backgroundColor: 'white', height: '100px', width: '100px' }} />
      </div>
    </div>
    // <input type="range" min={0}/>
  )
}

export default TimeSlider
