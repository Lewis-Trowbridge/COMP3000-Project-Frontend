import { useMemo } from 'react'
import { render } from '@testing-library/react'
import strftime from 'strftime'
import ReadingContext from '../../utils/ReadingContext'
import TemperatureChart from '../TemperatureChart'
import { BACKEND_RESPONSES } from '../../testConstants'

// eslint-disable-next-line react/prop-types
const MockProvider = ({ children, selected }) => (
  <ReadingContext.Provider value={useMemo(() => ({ selected }), [selected])}>
    {children}
  </ReadingContext.Provider>
)

describe('<TemperatureChart/>', () => {
  it('displays the date and value from the selected reading', async () => {
    const { findByText } = render(
      <MockProvider selected={BACKEND_RESPONSES.VALID.TEMP}>
        <TemperatureChart />
      </MockProvider>,
    )

    await findByText(`At ${strftime('%I%p', new Date(BACKEND_RESPONSES.VALID.TEMP.timestamp))} on the ${strftime('%o %B %Y', new Date(BACKEND_RESPONSES.VALID.TEMP.timestamp))}, the temperature was ${BACKEND_RESPONSES.VALID.TEMP.value}°C.`)
  })
})
