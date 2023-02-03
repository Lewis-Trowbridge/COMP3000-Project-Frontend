import { useContext, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import ReadingContext from '../utils/ReadingContext'
import { LEAFLET_POSITION_CLASSES, OPENSTREETMAPS_COPYRIGHT } from '../constants'

const InfoPanel = () => {
  const { selected } = useContext(ReadingContext)
  const { attributionControl } = useMap()

  useEffect(() => {
    if (selected !== undefined) {
      // eslint-disable-next-line no-underscore-dangle
      const attributions = Object.keys(attributionControl._attributions)
        .filter((item) => (item !== OPENSTREETMAPS_COPYRIGHT))
      attributions.forEach((existingAttribution) => {
        attributionControl.removeAttribution(existingAttribution)
      })
      attributionControl.addAttribution(selected.licenseInfo)
    }
  }, [selected, attributionControl])

  return (
    <div className={`${LEAFLET_POSITION_CLASSES.topright} info-panel`}>
      <div className="leaflet-bar leaflet-control">
        <div className="control-box info-panel-box">
          <div className="info-panel-content">
            {
              selected
                ? (<p className="info-text">{selected.station.name}</p>)
                : (<p className="no-info-text">No info selected. Please try clicking on one of the markers!</p>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoPanel
