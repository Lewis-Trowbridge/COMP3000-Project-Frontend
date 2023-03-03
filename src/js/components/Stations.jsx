import { Polygon } from 'react-leaflet'
import {
  useContext, useMemo,
} from 'react'
import { Delaunay } from 'd3-delaunay'
import ReadingContext from '../utils/ReadingContext'

const Stations = () => {
  const { bounds, data, setSelected } = useContext(ReadingContext)

  const polygonData = useMemo(() => {
    if (bounds && data) {
      const bbox = [
        bounds.bottomLeftY,
        bounds.bottomLeftX,
        bounds.topRightY,
        bounds.topRightX,
      ]
      const sites = data.map((reading) => ([
        reading.station.coordinates.lng, reading.station.coordinates.lat]))
      const voronoi = Delaunay.from(sites).voronoi(bbox)
      const polygons = []
      // Indexes line up, generator system forces us to use inelegant method
      let index = 0
      // eslint-disable-next-line no-restricted-syntax
      for (const point of voronoi.cellPolygons()) {
        const polygonInfo = {
          coords: [],
          data: data[index],
        }
        point.forEach((lngLatArr) => { polygonInfo.coords.push([lngLatArr[1], lngLatArr[0]]) })
        polygons.push(polygonInfo)
        // eslint-disable-next-line no-plusplus
        index++
      }
      return polygons
    }
    return []
  }, [bounds, data])

  return (
    <div>
      {polygonData.map((polygon) => (
        <Polygon
          key={polygon.data.station.name}
          positions={polygon.coords}
          eventHandlers={{
            click: () => setSelected(polygon.data),
          }}
        />
      ))}
    </div>
  )
}

export default Stations
