import { MapContainer, TileLayer } from 'react-leaflet'
import ReadingProvider from './ReadingProvider'
import Stations from './Stations'
import TimeSlider from './TimeSlider'
import InfoPanel from './InfoPanel'
import { OPENSTREETMAPS_COPYRIGHT } from '../constants'

const Map = () => (
  <MapContainer center={[51.505, -0.09]} zoom={13}>
    <ReadingProvider>
      <Stations />
      <TileLayer
        attribution={OPENSTREETMAPS_COPYRIGHT}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <InfoPanel />
      <TimeSlider />
    </ReadingProvider>
  </MapContainer>
)

export default Map
