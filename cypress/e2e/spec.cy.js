import strftime from 'strftime'

describe('COMP3000 Frontend E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234')
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

  it('places markers after moving the map', () => {
    moveMap(200, 0)
    cy.get('.leaflet-marker-icon')
      .should('be.visible')
  })

  it('displays reading information when marker is clicked', () => {
    moveMap(200, 0)
    cy.get('.leaflet-marker-icon')
      .click()

    cy.get('.info-header')
      .should('be.visible')
      .and('contain.text', 'London Honor Oak Park')

    cy.get('.VictoryContainer')
      .should('be.visible')
  })

  it('displays the attribution message', () => {
    moveMap(200, 0)
    cy.get('.leaflet-marker-icon')
      .click()

    cy.get('.leaflet-control-attribution')
      .should('contain.text', '© Crown copyright 2021 Defra via uk-air.defra.gov.uk, licensed under the Open Government Licence.')
  })

  it('updates the time text when the time slider is changed', () => {
    const FirstJan = new Date(1640995200000)
    moveMap(200, 0)
    cy.get('input[aria-label=time]')
      .invoke('val', FirstJan.getTime())
      .trigger('mouseup')

    cy.get('p[class=time-display-text]')
      .should('have.text', FirstJan.toString())
  })

  it('updates the popup text when the time slider is changed', () => {
    const FirstJan = new Date(1640995200000)
    const dynamicTimestring = `${strftime('%I%p', FirstJan)} on the ${strftime('%o %B %Y', FirstJan)}`

    moveMap(200, 0)

    cy.get('.leaflet-marker-icon')
      .click()

    cy.get('input[aria-label=time]')
      .and((input) => { input.val(FirstJan.getTime()) })
      .trigger('mouseup', { force: true })
    cy.get('.info-explanation-container > p:nth-child(3)')
      .should('be.visible')
      .and('contain.text', `At ${dynamicTimestring}, the pollution was around 4 above the recommended WHO limit.`)
  })
})
