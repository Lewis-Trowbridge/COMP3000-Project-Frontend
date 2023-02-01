import { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import Stations from './Stations'
import TimeSlider from './TimeSlider'

const Map = () => {
  const [date, setDate] = useState(new Date())

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13}>
      <Stations date={date} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TimeSlider date={date} setDate={setDate} />
    </MapContainer>
  )
}

export default Map
