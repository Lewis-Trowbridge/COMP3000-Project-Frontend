import strftime from 'strftime'

const airQualityBackend = 'airquality'
const airQualityBackendAlias = `@${airQualityBackend}`
const temperatureBackend = 'temperature'
const temperatureBackendAlias = `@${temperatureBackend}`

describe('COMP3000 Frontend E2E Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/airquality*', (req) => req.continue()).as(airQualityBackend)
    cy.intercept('GET', '/temperature*', (req) => req.continue()).as(temperatureBackend)
    cy.visit('http://localhost:1234')
    cy.wait(airQualityBackendAlias)
  })

  const moveMap = (x, y) => {
    cy.get('.leaflet-container')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: x, clientY: y })
      .trigger('mouseup', { force: true })
  }

  it('loads a map on load', () => {
    cy.get('.leaflet-tile-container')
      .children()
      .should('have.class', 'leaflet-tile')
      .and('be.visible')
      .and('have.class', 'leaflet-tile-loaded')
  })

  it('draws polygons on load', () => {
    cy.get('path.leaflet-interactive')
      .should('be.visible')
  })

  it('places markers after moving the map', () => {
    moveMap(200, 0)
    cy.get('path.leaflet-interactive')
      .should('be.visible')
  })

  it('displays reading information when marker is clicked', () => {
    cy.get('path.leaflet-interactive')
      .first()
      .click()

    cy.get('.info-header')
      .should('be.visible')
      .and('contain.text', 'London Westminster')

    cy.get('.VictoryContainer')
      .should('be.visible')
  })

  it('displays the attribution message', () => {
    cy.get('path.leaflet-interactive')
      .first()
      .click()

    cy.get('.leaflet-control-attribution')
      .should('contain.text', '© Crown copyright 2021 Defra via uk-air.defra.gov.uk, licensed under the Open Government Licence.')
  })

  it('updates the time text when the time slider is changed', () => {
    const FirstJan = new Date(1640995200000)
    cy.get('input[aria-label=time]')
      .then((input) => {
        cy.controlledInputChange(input, FirstJan.getTime().toString())
      })

    cy.get('p[class=time-display-text]')
      .should('have.text', FirstJan.toString())
  })

  it('updates the popup text when the time slider is changed', () => {
    moveMap(-1000, 0)
    cy.wait(airQualityBackendAlias)
    const FirstJan = new Date(1640995200000)
    const dynamicTimestring = `${strftime('%I%p', FirstJan)} on the ${strftime('%o %B %Y', FirstJan)}`

    cy.get('path.leaflet-interactive')
      .click()

    cy.get('input[aria-label=time]')
      .then((input) => {
        cy.controlledInputChange(input, FirstJan.getTime().toString())
      })
      .trigger('mouseup', { force: true })

    cy.wait(airQualityBackendAlias)

    cy.get('.info-explanation-container > p:nth-child(3)')
      .should('be.visible')
      .and('contain.text', `At ${dynamicTimestring}, the pollution was around 1 above the recommended WHO limit.`)
  })

  it('displays temperature data when swapper is clicked', () => {
    moveMap(-400, 0)
    const FirstJan = new Date(1640995200000)
    const dynamicTimestring = `${strftime('%I%p', FirstJan)} on the ${strftime('%o %B %Y', FirstJan)}`

    cy.get('input[aria-label=time]')
      .then((input) => {
        cy.controlledInputChange(input, FirstJan.getTime().toString())
      })
      .trigger('mouseup', { force: true })

    cy.get('.react-toggle')
      .click()

    cy.wait(temperatureBackendAlias)

    cy.get('path.leaflet-interactive')
      .click()

    cy.get('.info-explanation-container > p:nth-child(3)')
      .should('be.visible')
      .and('contain.text', `At ${dynamicTimestring}, the temperature was 9.9°C.`)
  })
})
