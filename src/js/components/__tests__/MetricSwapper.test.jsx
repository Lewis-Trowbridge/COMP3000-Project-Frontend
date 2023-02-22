import { useMemo } from 'react'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ReadingContext from '../../utils/ReadingContext'
import MetricSwapper from '../MetricSwapper'
import { METRICS } from '../../constants'

const mockSetMetric = jest.fn()

// eslint-disable-next-line react/prop-types
const MockProvider = ({ children }) => (
  <ReadingContext.Provider value={useMemo(() => ({
    setMetric: mockSetMetric,
  }), [])}
  >
    {children}
  </ReadingContext.Provider>
)

describe('<MetricSwapper/>', () => {
  it('does not change the default metric on render', async () => {
    const { findByRole } = render(
      <MockProvider>
        <MetricSwapper />
      </MockProvider>,
    )

    await findByRole('checkbox', { name: 'Display' })

    await waitFor(() => expect(mockSetMetric).not.toHaveBeenCalled())
  })

  it('sets metric to temperature when clicked', async () => {
    const user = userEvent.setup()
    const { findByRole } = render(
      <MockProvider>
        <MetricSwapper />
      </MockProvider>,
    )

    const swapper = await findByRole('checkbox', { name: 'Display' })

    await user.click(swapper)

    await waitFor(() => expect(mockSetMetric).toHaveBeenCalledTimes(1))
    expect(mockSetMetric).toHaveBeenNthCalledWith(1, METRICS.TEMPERATURE)
  })

  it('sets metric to air quality when clicked back', async () => {
    const user = userEvent.setup()
    const { findByRole } = render(
      <MockProvider>
        <MetricSwapper />
      </MockProvider>,
    )

    const swapper = await findByRole('checkbox', { name: 'Display' })

    await user.click(swapper)
    await user.click(swapper)

    await waitFor(() => expect(mockSetMetric).toHaveBeenCalledTimes(2))
    expect(mockSetMetric).toHaveBeenNthCalledWith(1, METRICS.TEMPERATURE)
    expect(mockSetMetric).toHaveBeenNthCalledWith(2, METRICS.AIR_QUALITY)
  })
})
