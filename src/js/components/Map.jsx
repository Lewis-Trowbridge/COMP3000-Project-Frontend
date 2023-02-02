import { MapContainer, TileLayer } from 'react-leaflet'
import ReadingProvider from './ReadingProvider'
import Stations from './Stations'
import TimeSlider from './TimeSlider'

const Map = () => (
  <MapContainer center={[51.505, -0.09]} zoom={13}>
    <ReadingProvider>
      <Stations />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TimeSlider />
    </ReadingProvider>
  </MapContainer>
)

export default Map
