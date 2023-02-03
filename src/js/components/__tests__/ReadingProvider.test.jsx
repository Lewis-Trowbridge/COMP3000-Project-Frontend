import { render, waitFor, act } from '@testing-library/react'
import { useContext } from 'react'
import { useMapEvents } from 'react-leaflet'
import { TIME_VALUES } from '../../constants'
import { BACKEND_RESPONSES } from '../../testConstants'
import ReadingContext from '../../utils/ReadingContext'
import useBackend from '../../utils/useBackend'
import ReadingProvider from '../ReadingProvider'

const fakeBounds = {
  bottomLeftX: 0,
  bottomLeftY: 0,
  topRightX: 0,
  topRightY: 0,
}

jest.mock('react-leaflet', () => ({
  useMapEvents: jest.fn().mockReturnValue({
    getBounds: jest.fn().mockReturnValue({
      getNorthEast: () => ({
        lat: fakeBounds.topRightX,
        lng: fakeBounds.topRightY,
      }),
      getSouthWest: () => ({
        lat: fakeBounds.bottomLeftX,
        lng: fakeBounds.bottomLeftY,
      }),
    }),
  }),
}))

jest.mock('../../utils/useBackend', () => ({
  __esModule: true,
  default: jest.fn(),
}))

let data
let date
let setDate

const currentDate = new Date(TIME_VALUES.JAN_1_1990_UNIX_TIMESTAMP)

beforeAll(() => {
  jest.useFakeTimers({ doNotFake: ['setTimeout'], now: currentDate })
})

const MockReciever = () => {
  ({ data, date, setDate } = useContext(ReadingContext))
  return <p>Recieved</p>
}

describe('<ReadingProvider/>', () => {
  it('sets data to the result of useBackend', async () => {
    useBackend.mockReturnValueOnce({ data: [BACKEND_RESPONSES.VALID] })

    render(
      <ReadingProvider>
        <MockReciever />
      </ReadingProvider>,
    )

    await waitFor(() => expect(data).toEqual([BACKEND_RESPONSES.VALID]))
  })

  it('sets date to current date on render', async () => {
    useBackend.mockReturnValueOnce({ data: [] })

    render(
      <ReadingProvider>
        <MockReciever />
      </ReadingProvider>,
    )

    await waitFor(() => expect(date).toEqual(currentDate))
  })

  it('sets date to the result of setDate', async () => {
    useBackend.mockReturnValue({ data: [] })

    render(
      <ReadingProvider>
        <MockReciever />
      </ReadingProvider>,
    )

    const expected = new Date()

    await act(() => {
      setDate(expected)
    })

    await waitFor(() => expect(date).toEqual(expected))
  })

  it('calls useBackend on render', async () => {
    useBackend.mockReturnValue({ data: [] })

    render(
      <ReadingProvider>
        <MockReciever />
      </ReadingProvider>,
    )

    await waitFor(() => expect(useBackend).toHaveBeenCalledTimes(1))
  })

  it('calls useBackend when moveend event fires', async () => {
    useBackend.mockReturnValue({ data: [] })

    render(
      <ReadingProvider>
        <MockReciever />
      </ReadingProvider>,
    )

    act(() => {
      useMapEvents.mock.lastCall[0].moveend()
    })

    await waitFor(() => expect(useBackend).toHaveBeenCalledTimes(2))
  })

  it('calls useBackend when date changes to the result of setDate', async () => {
    useBackend.mockReturnValue({ data: [] })

    render(
      <ReadingProvider>
        <MockReciever />
      </ReadingProvider>,
    )

    const expected = new Date(currentDate)
    expected.setDate(expected.getDate() + 1)

    act(() => {
      setDate(expected)
    })

    await waitFor(() => expect(useBackend).toHaveBeenCalledTimes(2))
    expect(useBackend).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ timestamp: expected.toISOString() }),
    )
  })

  it('calls useBackend with null timestamp when date is current date', async () => {
    useBackend.mockReturnValue({ data: [] })

    render(
      <ReadingProvider>
        <MockReciever />
      </ReadingProvider>,
    )

    await waitFor(() => expect(useBackend).toHaveBeenCalledTimes(1))
    expect(useBackend).toHaveBeenNthCalledWith(1, expect.objectContaining({ timestamp: null }))
  })
})

afterAll(() => {
  jest.useRealTimers()
})
