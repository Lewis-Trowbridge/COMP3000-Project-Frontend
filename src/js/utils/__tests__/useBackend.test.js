import { act, renderHook } from '@testing-library/react'
import useBackend from '../useBackend'
import { URLS } from '../../constants'

const mockFetch = jest.fn().mockReturnValue(
  Promise.resolve({
    json: jest.fn().mockReturnValue(Promise.resolve([])),
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
})
