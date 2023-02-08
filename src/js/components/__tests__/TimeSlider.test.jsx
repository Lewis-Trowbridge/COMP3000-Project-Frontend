import { useMemo } from 'react'
import {
  fireEvent, render, waitFor,
} from '@testing-library/react'
import TimeSlider from '../TimeSlider'
import ReadingContext from '../../utils/ReadingContext'

let currentTime = new Date(1640995200000)

// eslint-disable-next-line react/prop-types
const MockProvider = ({ children, date, setDate }) => (
  <ReadingContext.Provider value={useMemo(() => ({ date, setDate }), [date, setDate])}>
    {children}
  </ReadingContext.Provider>
)

beforeAll(() => {
  jest.useFakeTimers({ doNotFake: ['setTimeout'], now: currentTime })
})

beforeEach(() => {
  currentTime = new Date(1640995200000)
})

describe('<TimeSlider/>', () => {
  it('shows the current time on render', async () => {
    const { findByText } = render(
      <MockProvider date={currentTime} setDate={jest.fn()}>
        <TimeSlider />
      </MockProvider>,
    )
    const timeOutput = await findByText(currentTime.toString())

    expect(timeOutput).toBeInTheDocument()
  })

  it('shows when dragging the slider without letting go', async () => {
    const mockSetDate = jest.fn()
    const { findByText, findByRole } = render(
      <MockProvider date={currentTime} setDate={mockSetDate}>
        <TimeSlider />
      </MockProvider>,
    )

    const expectedTime = new Date(currentTime.getTime())
    expectedTime.setDate(expectedTime.getDate() + 1)
    const timeOutput = await findByText(currentTime.toString())
    const slider = await findByRole('slider', { name: 'time' })

    fireEvent.change(slider, { target: { value: expectedTime.getTime() } })

    await waitFor(() => expect(timeOutput).toHaveTextContent(expectedTime.toString()))
    expect(mockSetDate).not.toHaveBeenCalledWith(expectedTime)
  })

  it('shows the time when the slider is dragged and let go', async () => {
    const mockSetDate = jest.fn()
    const { findByText, findByRole } = render(
      <MockProvider date={currentTime} setDate={mockSetDate}>
        <TimeSlider />
      </MockProvider>,
    )

    const timeOutput = await findByText(currentTime.toString())
    const slider = await findByRole('slider', { name: 'time' })
    expect(slider).toHaveValue(currentTime.getTime().toString())

    const expectedTime = new Date(currentTime.getTime())
    expectedTime.setDate(expectedTime.getDate() + 1)

    fireEvent.change(slider, { target: { value: expectedTime.getTime() } })
    fireEvent.mouseUp(slider)

    await waitFor(() => expect(timeOutput).toHaveTextContent(expectedTime.toString()))
    expect(slider).toHaveValue(expectedTime.getTime().toString())

    expect(mockSetDate).toHaveBeenCalledTimes(2)
    expect(mockSetDate).toHaveBeenNthCalledWith(1, currentTime)
    expect(mockSetDate).toHaveBeenNthCalledWith(2, expectedTime)
  })
})

afterAll(() => { jest.useRealTimers() })
