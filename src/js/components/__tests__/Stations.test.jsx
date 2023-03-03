import { render, waitFor } from '@testing-library/react'
import { useMemo } from 'react'
import userEvent from '@testing-library/user-event'
import Stations from '../Stations'
import { BACKEND_RESPONSES } from '../../testConstants'
import ReadingContext from '../../utils/ReadingContext'

const validBounds = {
  bottomLeftX: 50.28802311905958,
  bottomLeftY: -4.740600585937501,
  topRightX: 50.45531820438789,
  topRightY: -3.6859130859375004,
}

const mockSetSelected = jest.fn()

// eslint-disable-next-line react/prop-types
const MockProvider = ({ bounds = validBounds, children, data }) => (
  <ReadingContext.Provider value={useMemo(() => ({
    bounds, data, setSelected: mockSetSelected,
  }), [bounds, data])}
  >
    {children}
  </ReadingContext.Provider>
)

jest.mock('react-leaflet', () => ({
  /* eslint-disable react/prop-types */
  Polygon: ({ eventHandlers }) => (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button type="button" onClick={eventHandlers.click} />
  ),
}))
/* eslint-enable react/prop-types */

describe('<Stations/>', () => {
  it('renders a set of polygons from a set of return data', async () => {
    const { findByRole } = render(
      <MockProvider data={[BACKEND_RESPONSES.VALID.AIR]}>
        <Stations />
      </MockProvider>,
    )

    expect(await findByRole('button')).toBeInTheDocument()
  })

  it('does not render polygons when an empty list is returned', async () => {
    const { queryByRole } = render(
      <MockProvider data={[]}>
        <Stations />
      </MockProvider>,
    )

    expect(queryByRole('button')).not.toBeInTheDocument()
  })

  it('rerenders when data changes', async () => {
    const { queryByRole, findByRole, rerender } = render(
      <MockProvider data={[]}>
        <Stations />
      </MockProvider>,
    )

    expect(queryByRole('button')).not.toBeInTheDocument()

    rerender(
      <MockProvider data={[BACKEND_RESPONSES.VALID.AIR]}>
        <Stations />
      </MockProvider>,
    )
    expect(await findByRole('button')).toBeInTheDocument()
  })

  it('calls setSelected with the given data when clicking the relevant polygon', async () => {
    const user = userEvent.setup()
    const { findByRole } = render(
      <MockProvider data={[BACKEND_RESPONSES.VALID.AIR]}>
        <Stations />
      </MockProvider>,
    )

    const button = await findByRole('button')
    await user.click(button)

    await waitFor(() => expect(mockSetSelected).toHaveBeenCalledTimes(1))
    expect(mockSetSelected).toHaveBeenNthCalledWith(1, BACKEND_RESPONSES.VALID.AIR)
  })
})
