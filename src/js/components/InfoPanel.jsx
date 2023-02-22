import { useContext, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import ReadingContext from '../utils/ReadingContext'
import {
  LEAFLET_POSITION_CLASSES, METRICS, OPENSTREETMAPS_COPYRIGHT,
} from '../constants'
import AirQualityInfo from './AirQualityChart'

const InfoPanel = () => {
  const { selected, metric } = useContext(ReadingContext)
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
          <div className="flex-container">
            {
              selected
                ? (
                  <div className="flexbox">
                    <h1 className="info-header">{selected.station.name}</h1>
                    <h2 className="info-subheader">{selected.type}</h2>
                    {
                      {
                        [METRICS.AIR_QUALITY]: <AirQualityInfo selected={selected} />,
                        [METRICS.TEMPERATURE]: <p>{JSON.stringify(selected)}</p>,
                      }[metric]
                    }
                  </div>
                )
                : (<p className="no-info-text">No info selected. Please try clicking on one of the markers!</p>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoPanel
