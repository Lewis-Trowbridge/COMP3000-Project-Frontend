import { Marker } from 'react-leaflet'
import { useContext } from 'react'
import ReadingContext from '../utils/ReadingContext'

const Stations = () => {
  const { data, setSelected } = useContext(ReadingContext)
  return (
    <div>
      {data.map((reading) => (
        <Marker
          key={reading.station.name}
          position={reading.station.coordinates}
          eventHandlers={{
            click: () => {
              setSelected(reading)
            },
          }}
        />
      ))}
    </div>
  )
}

export default Stations
