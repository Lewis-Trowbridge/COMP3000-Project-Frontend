import { act, renderHook, waitFor } from '@testing-library/react'
import useBackend from '../useBackend'
import { URLS } from '../../constants'

// Disable sort keys as data structure does not need to be alphabetised
/* eslint-disable sort-keys */
const mockData = [{
  value: 4.34,
  unit: 'PM2.5',
  timestamp: '2022-11-10T00:00:00Z',
  licenseInfo: '© Crown copyright 2021 Defra via uk-air.defra.gov.uk, licensed under the Open Government Licence.',
  station: {
    name: 'Plymouth Centre',
    coordinates: {
      lat: 50.37167,
      lng: -4.142361,
    },
  },
}]
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
