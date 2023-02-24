import { useContext } from 'react'
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory'
import strftime from 'strftime'
import ReadingContext from '../utils/ReadingContext'

const TemperatureChart = () => {
  const { selected } = useContext(ReadingContext)

  return (
    <>
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
          The 2022 heatwave is a recent example of
          {' '}
          <a
            href="https://www.bbc.co.uk/news/science-environment-63244353"
            target="_blank"
            rel="noreferrer"
            className="info-link"
          >
            {' '}
            extreme weather as a result of climate change,
          </a>
          {' '}
          breaking numerous maximum temperature records across the UK.
          {' '}
          <a
            href="https://www.metoffice.gov.uk/about-us/press-office/news/weather-and-climate/2022/2023-global-temperature-forecast"
            target="_blank"
            rel="noreferrer"
            className="info-link"
          >
            Even in January 2023,
          </a>
          {' '}
          temperatures were abnormally high.
          {' '}
          <a
            href="https://www.bbc.co.uk/news/science-environment-63407459"
            target="_blank"
            rel="noreferrer"
            className="info-link"
          >
            Urgent sweeping action is needed to address this trend.
          </a>

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
    </>
  )
}

export default TemperatureChart
