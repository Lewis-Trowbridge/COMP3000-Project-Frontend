import { act, renderHook, waitFor } from '@testing-library/react'
import useBackend from '../useBackend'
import { URLS } from '../../constants'
import { BACKEND_RESPONSES } from '../../testConstants'

// Disable sort keys as data structure does not need to be alphabetised
/* eslint-disable sort-keys */
const mockData = [BACKEND_RESPONSES.VALID]
/* eslint-enable sort-keys */

const expectedRequestValues = {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'POST',
  mode: 'cors',
}

const mockFetch = jest.fn().mockReturnValue(
  Promise.resolve({
    json: jest.fn().mockReturnValue(Promise.resolve(mockData)),
  }),
)
global.fetch = mockFetch

describe('useBackend', () => {
  it('makes a call to the correct URL on render', async () => {
    const testObject = {
      bbox: {
        bottomLeftX: 0,
        bottomLeftY: 0,
        topRightX: 0,
        topRightY: 0,
      },
      timestamp: new Date(),
    }

    await act(() => {
      renderHook(() => useBackend(testObject))
    })

    expect(mockFetch).toBeCalledTimes(1)
    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      `${URLS.BACKEND}/api/airquality`,
      {
        body: JSON.stringify(testObject),
        ...expectedRequestValues,
      },
    )
  })

  it('returns data from the backend', async () => {
    const testObject = {
      bbox: {
        bottomLeftX: 0,
        bottomLeftY: 0,
        topRightX: 0,
        topRightY: 0,
      },
      timestamp: new Date(),
    }

    const { result } = renderHook(() => useBackend(testObject))

    await waitFor(() => expect(result.current.data).toBe(mockData))
  })

  it('makes a call when the timestamp is changed', async () => {
    const oldTimestamp = new Date(0)
    const newTimestamp = new Date(1)

    const testObject = {
      bbox: {
        bottomLeftX: 0,
        bottomLeftY: 0,
        topRightX: 0,
        topRightY: 0,
      },
      timestamp: oldTimestamp,
    }

    renderHook(() => useBackend(testObject))
    await act(() => {
      testObject.timestamp = newTimestamp
    })

    await waitFor(() => expect(mockFetch).toBeCalledTimes(2))
    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      `${URLS.BACKEND}/api/airquality`,
      {
        body: JSON.stringify({ ...testObject, timestamp: oldTimestamp }),
        ...expectedRequestValues,
      },
    )
    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      `${URLS.BACKEND}/api/airquality`,
      {
        body: JSON.stringify({ ...testObject, timestamp: newTimestamp }),
        ...expectedRequestValues,
      },
    )
  })

  it('does not make a call when bbox is undefined', async () => {
    renderHook(() => useBackend({}))

    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('makes a call whenever bbox is changed', async () => {
    const oldBbox = {
      bottomLeftX: 0,
      bottomLeftY: 0,
      topRightX: 0,
      topRightY: 0,
    }

    const newBox = {
      bottomLeftX: 1,
      bottomLeftY: 1,
      topRightX: 1,
      topRightY: 1,
    }
    const testObject = {
      bbox: oldBbox,
      timestamp: new Date(),
    }

    renderHook(() => useBackend(testObject))
    await act(() => {
      testObject.bbox = newBox
    })

    await waitFor(() => expect(mockFetch).toBeCalledTimes(2))
    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      `${URLS.BACKEND}/api/airquality`,
      {
        body: JSON.stringify({ ...testObject, bbox: oldBbox }),
        ...expectedRequestValues,
      },
    )
    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      `${URLS.BACKEND}/api/airquality`,
      {
        body: JSON.stringify({ ...testObject, bbox: newBox }),
        ...expectedRequestValues,
      },
    )
  })
})
