import { act, render } from '@testing-library/react'
import { useMapEvents } from 'react-leaflet'
import Stations from '../Stations'
import { BACKEND_RESPONSES } from '../../testConstants'
import useBackend from '../../utils/useBackend'

jest.mock('react-leaflet', () => ({
  // eslint-disable-next-line react/prop-types
  Marker: ({ position }) => (
    <p>
      {/* eslint-disable-next-line react/prop-types */}
      {`${position.lat}, ${position.lng}`}
    </p>
  ),
  useMapEvents: jest.fn().mockReturnValue({
    getBounds: jest.fn().mockReturnValue({
      getNorthEast: () => ({
        lat: 0,
        lng: 0,
      }),
      getSouthWest: () => ({
        lat: 0,
        lng: 0,
      }),
    }),
  }),
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

  it('does not render markers when an empty list is returned', async () => {
    useBackend.mockReturnValueOnce({ data: [] })

    const { queryByText } = render(<Stations />)
    const expectedText = `${BACKEND_RESPONSES.VALID.station.coordinates.lat}, ${BACKEND_RESPONSES.VALID.station.coordinates.lng}`
    expect(await queryByText(expectedText)).not.toBeInTheDocument()
  })

  it('rerenders when the load event fires', async () => {
    useBackend.mockReturnValueOnce({ data: [] })
    useBackend.mockReturnValueOnce({ data: [BACKEND_RESPONSES.VALID] })

    const { queryByText } = render(<Stations />)

    const expectedText = `${BACKEND_RESPONSES.VALID.station.coordinates.lat}, ${BACKEND_RESPONSES.VALID.station.coordinates.lng}`
    expect(await queryByText(expectedText)).not.toBeInTheDocument()
    await act(() => {
      useMapEvents.mock.lastCall[0].load()
    })
    expect(await queryByText(expectedText)).toBeInTheDocument()
  })

  it('rerenders when the moveend event fires', async () => {
    useBackend.mockReturnValueOnce({ data: [] })
    useBackend.mockReturnValueOnce({ data: [BACKEND_RESPONSES.VALID] })

    const { queryByText } = render(<Stations />)

    const expectedText = `${BACKEND_RESPONSES.VALID.station.coordinates.lat}, ${BACKEND_RESPONSES.VALID.station.coordinates.lng}`
    expect(await queryByText(expectedText)).not.toBeInTheDocument()
    await act(() => {
      useMapEvents.mock.lastCall[0].moveend()
    })
    expect(await queryByText(expectedText)).toBeInTheDocument()
  })
})
