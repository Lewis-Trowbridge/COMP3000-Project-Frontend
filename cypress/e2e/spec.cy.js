describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234')
  })
  it('loads a map on load', () => {
    // eslint-disable-next-line no-undef
    expect($('.leaflet-tile-container')).to.have.descendants('img.leaflet-tile')
  })
})
