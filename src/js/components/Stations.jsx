import { Polygon } from 'react-leaflet'
import {
  useContext, useMemo,
} from 'react'
import { Delaunay } from 'd3-delaunay'
import ReadingContext from '../utils/ReadingContext'
import getColourCode from '../utils/getColourCode'

const Stations = () => {
  const {
    bounds, data, metric, setSelected,
  } = useContext(ReadingContext)

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
      const polygonArray = [...voronoi.cellPolygons()]
      return polygonArray.map((item, index) => ({
        colour: getColourCode(metric, data[index].value),
        coords: item.map((latLngArray) => latLngArray.reverse()),
        data: data[index],
      }))
    }
    return []
  }, [metric, bounds, data])
  return (
    <>
      {polygonData.map((polygon) => (
        <Polygon
          key={polygon.data.station.name}
          pathOptions={{ color: polygon.colour }}
          positions={polygon.coords}
          eventHandlers={{
            click: () => setSelected(polygon.data),
          }}
        />
      ))}
    </>
  )
}

export default Stations
