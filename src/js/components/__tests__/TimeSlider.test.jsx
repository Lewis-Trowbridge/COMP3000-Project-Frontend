import {
  fireEvent, render, waitFor,
} from '@testing-library/react'
import TimeSlider from '../TimeSlider'

const currentTime = new Date(1640995200000)

beforeAll(() => {
  jest.useFakeTimers({ doNotFake: ['setTimeout'], now: currentTime })
})

describe('<TimeSlider/>', () => {
  it('shows the current time on render', async () => {
    const { findByText } = render(<TimeSlider />)
    const timeOutput = await findByText(currentTime.toString())

    expect(timeOutput).toBeInTheDocument()
  })

  it('shows the time when the slider is dragged', async () => {
    const oneDayLater = new Date(currentTime)
    oneDayLater.setDate(oneDayLater.getDate() + 1)

    const { findByText, findByRole } = render(<TimeSlider />)

    const timeOutput = await findByText(currentTime.toString())
    const slider = await findByRole('slider', { name: 'time' })
    expect(slider).toHaveValue(currentTime.getTime().toString())

    fireEvent.change(slider, { target: { value: oneDayLater.getTime() } })

    await waitFor(() => expect(timeOutput).toHaveTextContent(oneDayLater.toString()))
    expect(slider).toHaveValue(oneDayLater.getTime().toString())
  })
})

afterAll(() => { jest.useRealTimers() })
