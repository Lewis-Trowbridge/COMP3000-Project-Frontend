import { Polygon } from 'react-leaflet'
import {
  useContext, useMemo,
} from 'react'
import { Delaunay } from 'd3-delaunay'
import ReadingContext from '../utils/ReadingContext'

const Stations = () => {
  // eslint-disable-next-line no-unused-vars
  const { bounds, data, setSelected } = useContext(ReadingContext)

  const polygonCoords = useMemo(() => {
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
      // eslint-disable-next-line no-restricted-syntax
      for (const point of voronoi.cellPolygons()) {
        polygons.push(point.map((lngLatArr) => ([lngLatArr[1], lngLatArr[0]])))
      }
      return polygons
    }
    return []
  }, [bounds, data])

  return (
    <div>
      {polygonCoords.map((coords) => (
        <Polygon
          positions={coords}
          eventHandlers={{
            // eslint-disable-next-line no-console
            click: () => console.log(coords),
          }}
        />
      ))}
    </div>
  )
}

export default Stations
