import { act, renderHook, waitFor } from '@testing-library/react'
import useBackend from '../useBackend'
import { METRICS, URLS } from '../../constants'
import { BACKEND_RESPONSES } from '../../testConstants'

// Disable sort keys as data structure does not need to be alphabetised
/* eslint-disable sort-keys */
const mockData = [BACKEND_RESPONSES.VALID]
/* eslint-enable sort-keys */

const validObject = {
  bbox: {
    bottomLeftX: 0,
    bottomLeftY: 0,
    topRightX: 0,
    topRightY: 0,
  },
  metric: METRICS.AIR_QUALITY,
  timestamp: new Date(),
}

const expectedRequestValues = {
  method: 'GET',
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
    await act(() => {
      renderHook(() => useBackend(validObject))
    })

    expect(mockFetch).toBeCalledTimes(1)
    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      `${URLS.BACKEND}/airquality?${new URLSearchParams({
        'bbox.bottomLeftX': validObject.bbox.bottomLeftX,
        'bbox.bottomLeftY': validObject.bbox.bottomLeftY,
        'bbox.topRightX': validObject.bbox.topRightX,
        'bbox.topRightY': validObject.bbox.topRightY,
        timestamp: validObject.timestamp || '',
      }).toString()}`,
      expectedRequestValues,
    )
  })

  it('returns data from the backend', async () => {
    const { result } = renderHook(() => useBackend(validObject))

    await waitFor(() => expect(result.current.data).toBe(mockData))
  })

  it('makes a call when the timestamp is changed', async () => {
    const oldTimestamp = new Date(0)
    const newTimestamp = new Date(1)
    const changingObject = { ...validObject, timestamp: oldTimestamp }

    renderHook(() => useBackend(changingObject))
    await act(() => {
      changingObject.timestamp = newTimestamp
    })

    await waitFor(() => expect(mockFetch).toBeCalledTimes(2))
    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      `${URLS.BACKEND}/airquality?${new URLSearchParams({
        'bbox.bottomLeftX': validObject.bbox.bottomLeftX,
        'bbox.bottomLeftY': validObject.bbox.bottomLeftY,
        'bbox.topRightX': validObject.bbox.topRightX,
        'bbox.topRightY': validObject.bbox.topRightY,
        timestamp: oldTimestamp || '',
      }).toString()}`,
      expectedRequestValues,

    )
    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      `${URLS.BACKEND}/airquality?${new URLSearchParams({
        'bbox.bottomLeftX': changingObject.bbox.bottomLeftX,
        'bbox.bottomLeftY': changingObject.bbox.bottomLeftY,
        'bbox.topRightX': changingObject.bbox.topRightX,
        'bbox.topRightY': changingObject.bbox.topRightY,
        timestamp: changingObject.timestamp || '',
      }).toString()}`,
      expectedRequestValues,
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
    const changingObject = {
      ...validObject,
      bbox: oldBbox,
    }

    renderHook(() => useBackend(changingObject))
    await act(() => {
      changingObject.bbox = newBox
    })

    await waitFor(() => expect(mockFetch).toBeCalledTimes(2))
    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      `${URLS.BACKEND}/airquality?${new URLSearchParams({
        'bbox.bottomLeftX': oldBbox.bottomLeftX,
        'bbox.bottomLeftY': oldBbox.bottomLeftY,
        'bbox.topRightX': oldBbox.topRightX,
        'bbox.topRightY': oldBbox.topRightY,
        timestamp: validObject.timestamp || '',
      }).toString()}`,
      expectedRequestValues,
    )
    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      `${URLS.BACKEND}/airquality?${new URLSearchParams({
        'bbox.bottomLeftX': newBox.bottomLeftX,
        'bbox.bottomLeftY': newBox.bottomLeftY,
        'bbox.topRightX': newBox.topRightX,
        'bbox.topRightY': newBox.topRightY,
        timestamp: validObject.timestamp || '',
      }).toString()}`,
      expectedRequestValues,
    )
  })

  it('makes a call when the metric is changed', async () => {
    const changingObject = { ...validObject }

    renderHook(() => useBackend(changingObject))
    await act(() => {
      changingObject.metric = METRICS.TEMPERATURE
    })

    await waitFor(() => expect(mockFetch).toBeCalledTimes(2))
    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      `${URLS.BACKEND}/${validObject.metric}?${new URLSearchParams({
        'bbox.bottomLeftX': validObject.bbox.bottomLeftX,
        'bbox.bottomLeftY': validObject.bbox.bottomLeftY,
        'bbox.topRightX': validObject.bbox.topRightX,
        'bbox.topRightY': validObject.bbox.topRightY,
        timestamp: validObject.timestamp || '',
      }).toString()}`,
      expectedRequestValues,
    )
    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      `${URLS.BACKEND}/${changingObject.metric}?${new URLSearchParams({
        'bbox.bottomLeftX': validObject.bbox.bottomLeftX,
        'bbox.bottomLeftY': validObject.bbox.bottomLeftY,
        'bbox.topRightX': validObject.bbox.topRightX,
        'bbox.topRightY': validObject.bbox.topRightY,
        timestamp: validObject.timestamp || '',
      }).toString()}`,
      expectedRequestValues,
    )
  })
})
