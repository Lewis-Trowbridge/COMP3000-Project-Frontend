import { render } from '@testing-library/react'
import Map from '../Map'

// Mock react-leaflet with simple mocks to test that they render correctly
jest.mock('react-leaflet', () => ({
  MapContainer: () => <p>Map</p>,
  TileLayer: () => <p>Tile layer</p>,
}))

describe('<Map/>', () => {
  it('renders a react-leaflet MapContainer', async () => {
    const { findByText } = render(<Map />)

    expect(await findByText('Map')).toBeInTheDocument()
  })
})
