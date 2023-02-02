import { render } from '@testing-library/react'
import { useMemo } from 'react'
import Stations from '../Stations'
import { BACKEND_RESPONSES } from '../../testConstants'
import ReadingContext from '../../utils/ReadingContext'

// eslint-disable-next-line react/prop-types
const MockProvider = ({ children, data }) => (
  <ReadingContext.Provider value={useMemo(() => ({ data }), [data])}>
    {children}
  </ReadingContext.Provider>
)

jest.mock('react-leaflet', () => ({
  /* eslint-disable react/prop-types */
  Marker: ({ children, position }) => (
    <div>
      <p>{`${position.lat}, ${position.lng}`}</p>
      {children}
    </div>
  ),
  Popup: ({ children }) => (<div>{children}</div>),
}))
/* eslint-enable react/prop-types */

describe('<Stations/>', () => {
  it('renders a set of markers from a set of return data', async () => {
    const { findByText } = render(
      <MockProvider data={[BACKEND_RESPONSES.VALID]}>
        <Stations />
      </MockProvider>,
    )
    const expectedText = `${BACKEND_RESPONSES.VALID.station.coordinates.lat}, ${BACKEND_RESPONSES.VALID.station.coordinates.lng}`
    expect(await findByText(expectedText)).toBeInTheDocument()
  })

  it('does not render markers when an empty list is returned', async () => {
    const { queryByText } = render(
      <MockProvider data={[]}>
        <Stations />
      </MockProvider>,
    )
    const expectedText = `${BACKEND_RESPONSES.VALID.station.coordinates.lat}, ${BACKEND_RESPONSES.VALID.station.coordinates.lng}`
    expect(queryByText(expectedText)).not.toBeInTheDocument()
  })

  it('rerenders when data changes', async () => {
    const { queryByText, findByText, rerender } = render(
      <MockProvider data={[]}>
        <Stations />
      </MockProvider>,
    )

    const expectedText = `${BACKEND_RESPONSES.VALID.station.coordinates.lat}, ${BACKEND_RESPONSES.VALID.station.coordinates.lng}`

    expect(queryByText(expectedText)).not.toBeInTheDocument()

    rerender(
      <MockProvider data={[BACKEND_RESPONSES.VALID]}>
        <Stations />
      </MockProvider>,
    )
    expect(await findByText(expectedText)).toBeInTheDocument()
  })

  it('renders a popup with the given information', async () => {
    const { findByText } = render(
      <MockProvider data={[BACKEND_RESPONSES.VALID]}>
        <Stations />
      </MockProvider>,
    )

    expect(await findByText(`${BACKEND_RESPONSES.VALID.value} ${BACKEND_RESPONSES.VALID.unit}`)).toBeInTheDocument()
  })
})
