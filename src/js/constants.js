const URLS = {
  BACKEND: process.env.BACKEND_URL,
}

const LEAFLET_POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

const TIME_VALUES = {
  JAN_1_1990_UNIX_TIMESTAMP: 631152000000,
  ONE_HOUR_IN_MS: 3600000,
  ONE_MONTH_IN_MS: 26298000000,
  THREE_YEARS_IN_MS: 94670778000,
}

const OPENSTREETMAPS_COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const WHO_PM25_LIMIT = 5

export {
  // eslint-disable-next-line import/prefer-default-export
  URLS,
  LEAFLET_POSITION_CLASSES,
  TIME_VALUES,
  OPENSTREETMAPS_COPYRIGHT,
  WHO_PM25_LIMIT,
}
