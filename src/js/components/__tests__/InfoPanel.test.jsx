// eslint-disable-next-line react/prop-types
import { useMemo } from 'react'
import { render } from '@testing-library/react'
import ReadingContext from '../../utils/ReadingContext'
import InfoPanel from '../InfoPanel'
import { BACKEND_RESPONSES } from '../../testConstants'

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
      <MockProvider selected={BACKEND_RESPONSES.VALID.AIR}>
        <InfoPanel />
      </MockProvider>,
    )

    expect(await findByText(BACKEND_RESPONSES.VALID.AIR.station.name)).toBeInTheDocument()
  })

  it('displays recorded when the result is recorded', async () => {
    const { findByText } = render(
      <MockProvider selected={BACKEND_RESPONSES.VALID.AIR}>
        <InfoPanel />
      </MockProvider>,
    )

    expect(await findByText('Recorded')).toBeInTheDocument()
  })

  it('displays predicted when the result is predicted', async () => {
    const { findByText } = render(
      <MockProvider selected={{ ...BACKEND_RESPONSES.VALID.AIR, type: 'Predicted' }}>
        <InfoPanel />
      </MockProvider>,
    )

    expect(await findByText('Predicted')).toBeInTheDocument()
  })
})
