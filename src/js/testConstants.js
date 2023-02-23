/* eslint-disable sort-keys */

const BACKEND_RESPONSES = {
  VALID: {
    AIR: {
      type: 'Recorded',
      value: 3,
      unit: 'PM2.5',
      timestamp: '2022-11-15T00:00:00Z',
      licenseInfo: '© Crown copyright 2021 Defra via uk-air.defra.gov.uk, licensed under the Open Government Licence.',
      station: {
        name: 'Saltash Callington Road',
        coordinates: { lat: 50.411463, lng: -4.227678 },
      },
    },
    TEMP: {
      type: 'Recorded',
      value: 1,
      unit: '°C',
      timestamp: '2022-11-15T00:00:00Z',
      licenseInfo: '© Crown copyright 2021 Defra via uk-air.defra.gov.uk, licensed under the Open Government Licence.',
      station: {
        name: 'Saltash Callington Road',
        coordinates: { lat: 50.411463, lng: -4.227678 },
      },
    },
  },
}

/* eslint-enable sort-keys */

/* eslint-disable import/prefer-default-export */
export {
  BACKEND_RESPONSES,
}
/* eslint-enable import/prefer-default-export */
