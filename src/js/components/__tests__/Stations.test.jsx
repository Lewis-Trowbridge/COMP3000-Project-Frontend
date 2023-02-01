import { act, render } from '@testing-library/react'
import { useMapEvents } from 'react-leaflet'
import Stations from '../Stations'
import { BACKEND_RESPONSES } from '../../testConstants'
import useBackend from '../../utils/useBackend'

const validDate = new Date()

jest.mock('react-leaflet', () => ({
  /* eslint-disable react/prop-types */
  Marker: ({ children, position }) => (
    <div>
      <p>{`${position.lat}, ${position.lng}`}</p>
      {children}
    </div>
  ),
  Popup: ({ children }) => (<div>{children}</div>),
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
/* eslint-enable react/prop-types */

jest.mock('../../utils/useBackend', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<Stations/>', () => {
  it('renders a set of markers from a set of return data', async () => {
    useBackend.mockReturnValueOnce({ data: [BACKEND_RESPONSES.VALID] })

    const { findByText } = render(<Stations date={validDate} />)
    const expectedText = `${BACKEND_RESPONSES.VALID.station.coordinates.lat}, ${BACKEND_RESPONSES.VALID.station.coordinates.lng}`
    expect(await findByText(expectedText)).toBeInTheDocument()
  })

  it('does not render markers when an empty list is returned', async () => {
    useBackend.mockReturnValueOnce({ data: [] })

    const { queryByText } = render(<Stations date={validDate} />)
    const expectedText = `${BACKEND_RESPONSES.VALID.station.coordinates.lat}, ${BACKEND_RESPONSES.VALID.station.coordinates.lng}`
    expect(queryByText(expectedText)).not.toBeInTheDocument()
  })

  it('rerenders when the load event fires', async () => {
    useBackend.mockReturnValueOnce({ data: [] })
    useBackend.mockReturnValueOnce({ data: [BACKEND_RESPONSES.VALID] })

    const { queryByText } = render(<Stations date={validDate} />)

    const expectedText = `${BACKEND_RESPONSES.VALID.station.coordinates.lat}, ${BACKEND_RESPONSES.VALID.station.coordinates.lng}`
    expect(queryByText(expectedText)).not.toBeInTheDocument()
    act(() => {
      useMapEvents.mock.lastCall[0].load()
    })
    expect(queryByText(expectedText)).toBeInTheDocument()
  })

  it('rerenders when the moveend event fires', async () => {
    useBackend.mockReturnValueOnce({ data: [] })
    useBackend.mockReturnValueOnce({ data: [BACKEND_RESPONSES.VALID] })

    const { queryByText } = render(<Stations date={validDate} />)

    const expectedText = `${BACKEND_RESPONSES.VALID.station.coordinates.lat}, ${BACKEND_RESPONSES.VALID.station.coordinates.lng}`
    expect(queryByText(expectedText)).not.toBeInTheDocument()
    act(() => {
      useMapEvents.mock.lastCall[0].moveend()
    })
    expect(queryByText(expectedText)).toBeInTheDocument()
  })

  it('renders a popup with the given information', async () => {
    useBackend.mockReturnValueOnce({ data: [BACKEND_RESPONSES.VALID] })

    const { findByText } = render(<Stations date={validDate} />)

    expect(await findByText(`${BACKEND_RESPONSES.VALID.value} ${BACKEND_RESPONSES.VALID.unit}`)).toBeInTheDocument()
  })
})
