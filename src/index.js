import { createRoot } from 'react-dom/client'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTemperature2, faWind } from '@fortawesome/free-solid-svg-icons'
import App from './js/App'

// eslint-disable-next-line no-underscore-dangle
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: iconShadow,
})

library.add(faTemperature2, faWind)

const container = document.getElementById('root')
const root = createRoot(container)
// eslint-disable-next-line react/jsx-filename-extension
root.render(<App />)
