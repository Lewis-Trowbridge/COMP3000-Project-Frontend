import { useContext } from 'react'
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory'
import strftime from 'strftime'
import ReadingContext from '../utils/ReadingContext'

const TemperatureChart = () => {
  const { selected } = useContext(ReadingContext)

  return (
    <div>
      <VictoryChart>
        <VictoryAxis dependentAxis label={`Temperature (${selected.unit})`} />
        <VictoryAxis />
        <VictoryBar
          animate={{ duration: 250, easing: 'quad' }}
          alignment="middle"
          barWidth={50}
          data={[{ x: ' ', y: selected.value }]}
          labels={[selected.value]}
        />
      </VictoryChart>
      <h2 className="info-explanation-header">What does this mean?</h2>
      <div className="info-explanation-container">
        <p>
          It is no secret that global warming and climate change
          are the most dangerous threats humanity faces.
          One of the most straightforward impacts is temperature, which the UK has not been spared.
        </p>
        <p>
          {/* TODO: Introduce links https://www.bbc.co.uk/news/science-environment-63244353 */}
          The 2022 heatwave is a recent example of extreme weather as a result of climate change,
          breaking numerous maximum temperature records across the UK.
          {' '}
          {/* TODO: Introduce links https://www.metoffice.gov.uk/about-us/press-office/news/weather-and-climate/2022/2023-global-temperature-forecast */}
          Even in January 2023, temperatures were abnormally high.
          {' '}
          {/* TODO: Introduce links https://www.bbc.co.uk/news/science-environment-63407459 */}
          Urgent sweeping action is needed to address this trend.
        </p>
        <p>
          At
          {' '}
          {strftime('%I%p', new Date(selected.timestamp))}
          {' '}
          on the
          {' '}
          {strftime('%o %B %Y', new Date(selected.timestamp))}
          , the temperature
          {' '}
          {selected.type === 'Recorded' ? 'was' : 'is predicted to be'}
          {' '}
          { selected.value }
          { selected.unit }
          .
        </p>
        <cite>BBC News, Met Office</cite>
      </div>
    </div>
  )
}

export default TemperatureChart
