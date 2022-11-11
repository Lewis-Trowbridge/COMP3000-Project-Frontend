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
      renderHook(() => useBackend(testObject.timestamp, testObject.bbox))
    })

    expect(mockFetch).toBeCalledTimes(1)
    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      `${URLS.BACKEND}/api/airquality`,
      {
        body: JSON.stringify(testObject),
        method: 'POST',
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

    await act(() => {
      const { result } = renderHook(() => useBackend(testObject.timestamp, testObject.bbox))
      waitFor(() => expect(mockFetch).toBeCalledTimes(1)).then(() => {
        expect(result.current.data).toBe(mockData)
      })
    })
  })
})
