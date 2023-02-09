import { useEffect, useState } from 'react'
import { URLS } from '../constants'

const useBackend = ({ timestamp, bbox }) => {
  const url = `${URLS.BACKEND}/api/airquality`
  const [data, setData] = useState([])

  useEffect(() => {
    if (bbox) {
      const requestObject = JSON.stringify({ bbox, timestamp })
      const request = fetch(url, {
        body: requestObject,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
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
