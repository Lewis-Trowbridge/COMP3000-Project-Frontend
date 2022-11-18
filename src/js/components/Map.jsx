import { MapContainer, TileLayer } from 'react-leaflet'
import Stations from './Stations'

const Map = () => (
  <MapContainer center={[51.505, -0.09]} zoom={13}>
    <Stations />
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  </MapContainer>
)

export default Map