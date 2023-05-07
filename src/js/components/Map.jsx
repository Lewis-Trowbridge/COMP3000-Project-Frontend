import { MapContainer, TileLayer } from 'react-leaflet'
import ReadingProvider from './ReadingProvider'
import Stations from './Stations'
import TimeSlider from './TimeSlider'
import InfoPanel from './InfoPanel'
import { OPENSTREETMAPS_COPYRIGHT } from '../constants'
import MetricSwapper from './MetricSwapper'

const Map = () => (
  <MapContainer center={[50.37331291880916, -4.140660226679756]} zoom={12}>
    <ReadingProvider>
      <Stations />
      <TileLayer
        attribution={OPENSTREETMAPS_COPYRIGHT}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <InfoPanel />
      <MetricSwapper />
      <TimeSlider />
    </ReadingProvider>
  </MapContainer>
)

export default Map
