// eslint-disable-next-line react/prop-types
import { useMemo } from 'react'
import { render } from '@testing-library/react'
import strftime from 'strftime'
import ReadingContext from '../../utils/ReadingContext'
import InfoPanel from '../InfoPanel'
import { BACKEND_RESPONSES } from '../../testConstants'
import { WHO_PM25_LIMIT } from '../../constants'

// eslint-disable-next-line react/prop-types
const MockProvider = ({ children, selected }) => (
  <ReadingContext.Provider value={useMemo(() => ({ selected }), [selected])}>
    {children}
  </ReadingContext.Provider>
)

const mockAttributionControl = {
  _attributions: [],
  addAttribution: jest.fn(),
  removeAttribution: jest.fn(),
}

jest.mock('react-leaflet', () => ({
  useMap: () => ({
    attributionControl: mockAttributionControl,
  }),
}))

describe('<InfoPanel />', () => {
  it('displays a message when no item is selected', async () => {
    const { findByText } = render(
      <MockProvider>
        <InfoPanel />
      </MockProvider>,
    )
    const expectedText = 'No info selected. Please try clicking on one of the markers!'
    expect(await findByText(expectedText)).toBeInTheDocument()
  })

  it('displays the name of the station when selected', async () => {
    const { findByText } = render(
      <MockProvider selected={BACKEND_RESPONSES.VALID}>
        <InfoPanel />
      </MockProvider>,
    )

    expect(await findByText(BACKEND_RESPONSES.VALID.station.name)).toBeInTheDocument()
  })

  it('displays the value of the selected reading', async () => {
    const { findByText } = render(
      <MockProvider selected={BACKEND_RESPONSES.VALID}>
        <InfoPanel />
      </MockProvider>,
    )

    expect(await findByText(BACKEND_RESPONSES.VALID.value)).toBeInTheDocument()
  })

  it('displays relevant text when the value is below 5', async () => {
    const { findByText } = render(
      <MockProvider selected={BACKEND_RESPONSES.VALID}>
        <InfoPanel />
      </MockProvider>,
    )
    const expectedText = `At ${strftime('%I%p', new Date(BACKEND_RESPONSES.VALID.timestamp))} on the ${strftime('%o %B %Y', new Date(BACKEND_RESPONSES.VALID.timestamp))}, the pollution was ${Math.abs(BACKEND_RESPONSES.VALID.value - WHO_PM25_LIMIT)} below the recommended WHO limit.`
    expect(await findByText(expectedText)).toBeInTheDocument()
  })
})
