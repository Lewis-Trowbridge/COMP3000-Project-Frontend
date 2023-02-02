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

    cy.get('.leaflet-popup-content')
      .should('be.visible')
      .and('contain.text', 'London Honor Oak Park')
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

    cy.get('p')
      .should('have.text', FirstJan.toString())
  })

  it('updates the popup text when the time slider is changed', () => {
    const FirstJan = new Date(1640995200000)
    moveMap(200, 0)
    cy.get('input[aria-label=time]')
      .invoke('val', FirstJan.getTime())
      .trigger('mouseup', { force: true })

    cy.get('.leaflet-marker-icon')
      .click()

    // Will remove this when proper explanations are introduced
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(4000)

    cy.get('.leaflet-popup-content')
      .should('be.visible')
      .and('contain.text', 'London Honor Oak Park')
      .and('contain.text', FirstJan.toUTCString())
  })
})
