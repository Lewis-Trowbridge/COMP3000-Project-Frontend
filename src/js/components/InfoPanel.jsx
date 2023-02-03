import { useContext } from 'react'
import ReadingContext from '../utils/ReadingContext'
import { LEAFLET_POSITION_CLASSES } from '../constants'

const InfoPanel = () => {
  const { data } = useContext(ReadingContext)
  console.log(data)

  return (
    <div className={`${LEAFLET_POSITION_CLASSES.topright} info-panel`}>
      <div className="leaflet-bar leaflet-control">
        <div className="control-box">
          <p>Placeholder</p>
        </div>
      </div>
    </div>
  )
}

export default InfoPanel
