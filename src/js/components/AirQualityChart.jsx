import {
  VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine,
} from 'victory'
import strftime from 'strftime'
import { useContext, useEffect, useState } from 'react'
import { WHO_PM25_LIMIT } from '../constants'
import ReadingContext from '../utils/ReadingContext'

const AirQualityChart = () => {
  const { selected } = useContext(ReadingContext)
  const [exceedsLimit, setExceedsLimit] = useState(false)

  useEffect(() => {
    setExceedsLimit(selected.value > WHO_PM25_LIMIT)
  }, [selected.value])

  return (
    <div>
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
          2.5 nanograms. PM
          <sub>2.5</sub>
          {' '}
          particles are invisible to the naked eye
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
          , the pollution
          {' '}
          {selected.type === 'Recorded' ? 'was' : 'is predicted to be'}
          {' '}
          around
          {' '}
          {Math.round(Math.abs(selected.value - WHO_PM25_LIMIT))}
          {' '}
          {exceedsLimit ? 'above ' : 'below '}
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
}

export default AirQualityChart
