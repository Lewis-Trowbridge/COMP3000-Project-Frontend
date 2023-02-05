import { render, waitFor } from '@testing-library/react'
import { useMemo } from 'react'
import userEvent from '@testing-library/user-event'
import Stations from '../Stations'
import { BACKEND_RESPONSES } from '../../testConstants'
import ReadingContext from '../../utils/ReadingContext'

const mockSetSelected = jest.fn()

// eslint-disable-next-line react/prop-types
const MockProvider = ({ children, data }) => (
  <ReadingContext.Provider value={useMemo(() => ({
    data, setSelected: mockSetSelected,
  }), [data])}
  >
    {children}
  </ReadingContext.Provider>
)

jest.mock('react-leaflet', () => ({
  /* eslint-disable react/prop-types */
  Marker: ({ eventHandlers }) => (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button type="button" onClick={eventHandlers.click} />
  ),
}))
/* eslint-enable react/prop-types */

describe('<Stations/>', () => {
  it('renders a set of markers from a set of return data', async () => {
    const { findByRole } = render(
      <MockProvider data={[BACKEND_RESPONSES.VALID]}>
        <Stations />
      </MockProvider>,
    )

    expect(await findByRole('button')).toBeInTheDocument()
  })

  it('does not render markers when an empty list is returned', async () => {
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
      <MockProvider data={[BACKEND_RESPONSES.VALID]}>
        <Stations />
      </MockProvider>,
    )
    expect(await findByRole('button')).toBeInTheDocument()
  })

  it('calls setSelected with the given data when clicking the relevant marker', async () => {
    const user = userEvent.setup()
    const { findByRole } = render(
      <MockProvider data={[BACKEND_RESPONSES.VALID]}>
        <Stations />
      </MockProvider>,
    )

    const button = await findByRole('button')
    await user.click(button)

    await waitFor(() => expect(mockSetSelected).toHaveBeenCalledTimes(1))
    expect(mockSetSelected).toHaveBeenNthCalledWith(1, BACKEND_RESPONSES.VALID)
  })
})
