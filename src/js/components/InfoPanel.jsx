import { useContext, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import {
  VictoryAxis, VictoryBar, VictoryChart, VictoryLine, VictoryLabel,
} from 'victory'
import ReadingContext from '../utils/ReadingContext'
import { LEAFLET_POSITION_CLASSES, OPENSTREETMAPS_COPYRIGHT, WHO_PM25_LIMIT } from '../constants'

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
                ? (
                  <div className="flexbox">
                    <h1 className="info-header">{selected.station.name}</h1>
                    <VictoryChart>
                      <VictoryAxis dependentAxis label="PM2.5 (µg/m3)" />
                      <VictoryAxis />
                      <VictoryLine
                        y={() => WHO_PM25_LIMIT}
                        interpolation="linear"
                        labels={['WHO PM2.5 recommended limit']}
                        labelComponent={<VictoryLabel renderInPortal dx={175} dy={-20} />}
                      />
                      <VictoryBar
                        animate={{ duration: 250, easing: 'quad' }}
                        alignment="middle"
                        barWidth={50}
                        style={{ data: { fill: selected.value < WHO_PM25_LIMIT ? '#8EEF11' : '#C20633' } }}
                        data={[{ x: ' ', y: selected.value }]}
                        labels={[selected.value]}
                      />
                    </VictoryChart>
                    <h2 className="info-explanation-header">What does this mean?</h2>
                    <div className="info-explanation-container">
                      <p>Placeholder</p>

                    </div>
                    <cite>World Health Organisation</cite>
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
