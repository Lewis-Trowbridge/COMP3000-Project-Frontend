import { useEffect, useState } from 'react'
import { URLS } from '../constants'

const useBackend = ({ timestamp, metric, bbox }) => {
  const url = `${URLS.BACKEND}/${metric}?`
  const [data, setData] = useState([])

  useEffect(() => {
    if (bbox) {
      const request = fetch(url + new URLSearchParams({
        'bbox.bottomLeftX': bbox.bottomLeftX,
        'bbox.bottomLeftY': bbox.bottomLeftY,
        'bbox.topRightX': bbox.topRightX,
        'bbox.topRightY': bbox.topRightY,
        timestamp: timestamp || '',
      }), {
        method: 'GET',
        mode: 'cors',
      })
      request.then((response) => response.json()
      // eslint-disable-next-line no-console
        .then((json) => setData(json))).catch((err) => { console.error(err) })
    }
  }, [timestamp, bbox, url])

  return { data }
}

export default useBackend
