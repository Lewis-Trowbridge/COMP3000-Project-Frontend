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

const METRICS = {
  AIR_QUALITY: 'airquality',
  TEMPERATURE: 'temperature',
}
const COLOUR_SCALES = {
  [METRICS.AIR_QUALITY]: {
    1: '#009900',
    2: '#479500',
    3: '#698f00',
    4: '#868700',
    5: '#a27d00',
    6: '#bc6f00',
    7: '#d55c00',
    8: '#eb4100',
    9: '#ff0000',
    10: '#990099',
  },
  [METRICS.TEMPERATURE]: {
    1: '#3bafe5',
    2: '#95d9f2',
    3: '#ffffff',
    4: '#ffd573',
    5: '#ffb400',
    6: '#fe7701',
    7: '#ff0000',
  },
}

export {
  // eslint-disable-next-line import/prefer-default-export
  URLS,
  LEAFLET_POSITION_CLASSES,
  TIME_VALUES,
  OPENSTREETMAPS_COPYRIGHT,
  WHO_PM25_LIMIT,
  METRICS,
  COLOUR_SCALES,
}
