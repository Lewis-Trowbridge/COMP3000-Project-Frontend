import { useContext, useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'
import {
  VictoryAxis, VictoryBar, VictoryChart, VictoryLine, VictoryLabel,
} from 'victory'
import strftime from 'strftime'
import ReadingContext from '../utils/ReadingContext'
import { LEAFLET_POSITION_CLASSES, OPENSTREETMAPS_COPYRIGHT, WHO_PM25_LIMIT } from '../constants'

const InfoPanel = () => {
  const { selected } = useContext(ReadingContext)
  const [exceedsLimit, setExceedsLimit] = useState(false)
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
      setExceedsLimit(selected.value > WHO_PM25_LIMIT)
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
                        style={{ data: { fill: exceedsLimit ? '#C20633' : '#8EEF11' } }}
                        data={[{ x: ' ', y: selected.value }]}
                        labels={[selected.value]}
                      />
                    </VictoryChart>
                    <h2 className="info-explanation-header">What does this mean?</h2>
                    <div className="info-explanation-container">
                      <p>
                        PM
                        <sub>2.5</sub>
                        {' '}
                        describes particles in the air you breathe that are smaller than
                        2.5 nanograms. PM2.5 particles are invisible to the naked eye
                        and small enough to pass through the lungs, into the bloodstream,
                        and into your organs.
                      </p>
                      <p>
                        Particulate matter impacts your health. It can reduce life expectancy and
                        lead to asthma, COPD, coronary heart disease, stroke, and lung cancer to
                        name a few.
                      </p>
                      <p>
                        At
                        {' '}
                        {strftime('%I%p', new Date(selected.timestamp))}
                        {' '}
                        on the
                        {' '}
                        {strftime('%o %B %Y', new Date(selected.timestamp))}
                        , the pollution was
                        {' '}
                        { Math.abs(selected.value - WHO_PM25_LIMIT) }
                        {' '}
                        { exceedsLimit ? 'above ' : 'below ' }
                        the recommended WHO limit.
                      </p>
                    </div>
                    <cite>
                      World Health Organisation,
                      Taskforce for Lung Health,
                      Imperial College London
                    </cite>
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
