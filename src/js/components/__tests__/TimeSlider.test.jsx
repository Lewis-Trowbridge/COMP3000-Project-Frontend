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

  it('shows the time when the slider is dragged', async () => {
    const { findByText, findByRole } = render(
      <MockProvider date={currentTime} setDate={jest.fn()}>
        <TimeSlider />
      </MockProvider>,
    )

    const timeOutput = await findByText(currentTime.toString())
    const slider = await findByRole('slider', { name: 'time' })
    expect(slider).toHaveValue(currentTime.getTime().toString())

    currentTime.setDate(currentTime.getDate() + 1)

    fireEvent.change(slider, { target: { value: currentTime.getTime() } })
    fireEvent.mouseUp(slider)

    await waitFor(() => expect(timeOutput).toHaveTextContent(currentTime.toString()))
    expect(slider).toHaveValue(currentTime.getTime().toString())
  })
})

afterAll(() => { jest.useRealTimers() })
