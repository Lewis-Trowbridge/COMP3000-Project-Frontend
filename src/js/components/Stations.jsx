import { Marker, Popup } from 'react-leaflet'
import { useContext } from 'react'
import Reading from './Reading'
import ReadingContext from '../utils/ReadingContext'

const Stations = () => {
  const { data } = useContext(ReadingContext)
  return (
    <div>
      {data.map((reading) => (
        <Marker key={reading.station.name} position={reading.station.coordinates}>
          <Popup attribution={reading.licenseInfo}>
            <Reading
              name={reading.station.name}
              unit={reading.unit}
              value={reading.value}
              timestamp={reading.timestamp}
            />
          </Popup>
        </Marker>
      ))}
    </div>
  )
}

export default Stations
