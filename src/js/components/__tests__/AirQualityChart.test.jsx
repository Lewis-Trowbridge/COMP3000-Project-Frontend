import { useMemo } from 'react'
import { render } from '@testing-library/react'
import strftime from 'strftime'
import ReadingContext from '../../utils/ReadingContext'
import { BACKEND_RESPONSES } from '../../testConstants'
import { WHO_PM25_LIMIT } from '../../constants'
import AirQualityChart from '../AirQualityChart'

// eslint-disable-next-line react/prop-types
const MockProvider = ({ children, selected }) => (
  <ReadingContext.Provider value={useMemo(() => ({ selected }), [selected])}>
    {children}
  </ReadingContext.Provider>
)

describe('<AirQualityChart/>', () => {
  it('displays the value of the selected reading', async () => {
    const { findByText } = render(
      <MockProvider selected={BACKEND_RESPONSES.VALID}>
        <AirQualityChart />
      </MockProvider>,
    )

    expect(await findByText(BACKEND_RESPONSES.VALID.value)).toBeInTheDocument()
  })

  it('displays relevant text when the value is below 5', async () => {
    const { findByText } = render(
      <MockProvider selected={BACKEND_RESPONSES.VALID}>
        <AirQualityChart />
      </MockProvider>,
    )
    const expectedText = `At ${strftime('%I%p', new Date(BACKEND_RESPONSES.VALID.timestamp))} on the ${strftime('%o %B %Y', new Date(BACKEND_RESPONSES.VALID.timestamp))}, the pollution was around ${Math.abs(BACKEND_RESPONSES.VALID.value - WHO_PM25_LIMIT)} below the recommended WHO limit.`
    expect(await findByText(expectedText)).toBeInTheDocument()
  })

  it('displays relevant text when the result is predicted', async () => {
    const { findByText } = render(
      <MockProvider selected={{ ...BACKEND_RESPONSES.VALID, type: 'Predicted' }}>
        <AirQualityChart />
      </MockProvider>,
    )

    const expectedText = `At ${strftime('%I%p', new Date(BACKEND_RESPONSES.VALID.timestamp))} on the ${strftime('%o %B %Y', new Date(BACKEND_RESPONSES.VALID.timestamp))}, the pollution is predicted to be around ${Math.abs(BACKEND_RESPONSES.VALID.value - WHO_PM25_LIMIT)} below the recommended WHO limit.`

    expect(await findByText(expectedText)).toBeInTheDocument()
  })
})
