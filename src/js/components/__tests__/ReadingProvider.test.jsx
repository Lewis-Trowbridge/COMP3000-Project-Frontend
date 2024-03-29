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
let selected
let setSelected

const currentDate = new Date(TIME_VALUES.JAN_1_1990_UNIX_TIMESTAMP)

beforeAll(() => {
  jest.useFakeTimers({ doNotFake: ['setTimeout'], now: currentDate })
})

const MockReceiver = () => {
  ({
    data, date, setDate, selected, setSelected,
  } = useContext(ReadingContext))
  return <p>Received</p>
}

describe('<ReadingProvider/>', () => {
  it('sets data to the result of useBackend', async () => {
    useBackend.mockReturnValue({ data: [BACKEND_RESPONSES.VALID.AIR] })

    render(
      <ReadingProvider>
        <MockReceiver />
      </ReadingProvider>,
    )

    await waitFor(() => expect(data).toEqual([BACKEND_RESPONSES.VALID.AIR]))
  })

  it('sets date to current date on render', async () => {
    useBackend.mockReturnValue({ data: [] })

    render(
      <ReadingProvider>
        <MockReceiver />
      </ReadingProvider>,
    )

    await waitFor(() => expect(date).toEqual(currentDate))
  })

  it('sets date to the result of setDate', async () => {
    useBackend.mockReturnValue({ data: [] })

    render(
      <ReadingProvider>
        <MockReceiver />
      </ReadingProvider>,
    )

    const expected = new Date()

    await act(() => {
      setDate(expected)
    })

    await waitFor(() => expect(date).toEqual(expected))
  })

  it('calls useBackend with map bounds on render', async () => {
    useBackend.mockReturnValue({ data: [] })

    render(
      <ReadingProvider>
        <MockReceiver />
      </ReadingProvider>,
    )

    await waitFor(() => expect(useBackend).toHaveBeenCalledTimes(2))
    expect(useBackend).toHaveBeenNthCalledWith(2, expect.objectContaining({ bbox: fakeBounds }))
  })

  it('calls useBackend when moveend event fires', async () => {
    useBackend.mockReturnValue({ data: [] })

    render(
      <ReadingProvider>
        <MockReceiver />
      </ReadingProvider>,
    )

    act(() => {
      useMapEvents.mock.lastCall[0].moveend()
    })

    await waitFor(() => expect(useBackend).toHaveBeenCalledTimes(3))
  })

  it('calls useBackend when date changes to the result of setDate', async () => {
    useBackend.mockReturnValue({ data: [] })

    render(
      <ReadingProvider>
        <MockReceiver />
      </ReadingProvider>,
    )

    const expected = new Date(currentDate)
    expected.setDate(expected.getDate() + 1)

    act(() => {
      setDate(expected)
    })

    await waitFor(() => expect(useBackend).toHaveBeenCalledTimes(3))
    expect(useBackend).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ timestamp: expected.toISOString() }),
    )
  })

  it('calls useBackend with null timestamp when date is current date', async () => {
    useBackend.mockReturnValue({ data: [] })

    render(
      <ReadingProvider>
        <MockReceiver />
      </ReadingProvider>,
    )

    await waitFor(() => expect(useBackend).toHaveBeenCalledTimes(2))
    expect(useBackend).toHaveBeenNthCalledWith(2, expect.objectContaining({ timestamp: null }))
  })

  it('updates selected with new data if there is an item in the backend response with the same station name on date change', async () => {
    // eslint-disable-next-line max-len
    const updatedData = { ...BACKEND_RESPONSES.VALID.AIR, value: BACKEND_RESPONSES.VALID.AIR.value + 1 }
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)

    useBackend.mockReturnValue({ data: [BACKEND_RESPONSES.VALID.AIR] })

    render(
      <ReadingProvider>
        <MockReceiver />
      </ReadingProvider>,
    )
    await act(() => {
      setSelected(BACKEND_RESPONSES.VALID.AIR)
    })
    await waitFor(() => expect(selected).toEqual(BACKEND_RESPONSES.VALID.AIR))

    useBackend.mockReturnValue({ data: [updatedData] })
    await act(() => {
      setDate(newDate)
    })

    await waitFor(() => expect(selected).toEqual(updatedData))
  })

  it('sets selected to undefined if no item is found', async () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)

    useBackend.mockReturnValue({ data: [BACKEND_RESPONSES.VALID.AIR] })

    render(
      <ReadingProvider>
        <MockReceiver />
      </ReadingProvider>,
    )
    await act(() => {
      setSelected(BACKEND_RESPONSES.VALID.AIR)
    })
    await waitFor(() => expect(selected).toEqual(BACKEND_RESPONSES.VALID.AIR))

    useBackend.mockReturnValue({ data: [] })
    await act(() => {
      setDate(newDate)
    })
    await waitFor(() => expect(selected).toBeUndefined())
  })
})

afterAll(() => {
  jest.useRealTimers()
})
