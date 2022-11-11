import { useEffect, useState } from 'react'
import { URLS } from '../constants'

const useBackend = (timestamp, bbox) => {
  const url = `${URLS.BACKEND}/api/airquality`
  const [data, setData] = useState([])

  useEffect(() => {
    const requestObject = { bbox, timestamp }
    const request = fetch(url, { body: JSON.stringify(requestObject), method: 'POST' })
    request.then((response) => response.json()
      .then((json) => setData(json)))
  }, [timestamp, bbox, url])

  return { data }
}

export default useBackend
