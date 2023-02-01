describe('empty spec', () => {
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
})
