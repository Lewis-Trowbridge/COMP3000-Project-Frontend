import { render } from '@testing-library/react'
import Stations from '../Stations'
import { BACKEND_RESPONSES } from '../../testConstants'
import useBackend from '../../utils/useBackend'

const mockMap = {
  getBounds: jest.fn().mockReturnValue({}),
}

jest.mock('react-leaflet', () => ({
  // eslint-disable-next-line react/prop-types
  Marker: ({ position }) => (
    <p>
      {/* eslint-disable-next-line react/prop-types */}
      {`${position.lat}, ${position.lng}`}
    </p>
  ),
  useMapEvents: jest.fn().mockReturnValue(mockMap),
}))

jest.mock('../../utils/useBackend', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<Stations/>', () => {
  it('renders a set of markers from a set of return data', async () => {
    useBackend.mockReturnValueOnce({ data: [BACKEND_RESPONSES.VALID] })

    const { findByText } = render(<Stations />)
    const expectedText = `${BACKEND_RESPONSES.VALID.station.coordinates.lat}, ${BACKEND_RESPONSES.VALID.station.coordinates.lng}`
    expect(await findByText(expectedText)).toBeInTheDocument()
  })
})
