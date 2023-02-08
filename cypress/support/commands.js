// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Imported from https://github.com/cypress-io/cypress/issues/1570#issuecomment-604525894 to fix error with Cypress and React:
Cypress.Commands.add('controlledInputChange', (input, value) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value',
  ).set

  const changeInputValue = (inputToChange) => (newValue) => {
    nativeInputValueSetter.call(inputToChange[0], newValue)
    inputToChange[0].dispatchEvent(new Event('change', { bubbles: true, newValue }))
  }

  // eslint-disable-next-line no-shadow
  return cy.get(input).then((input) => changeInputValue(input)(value))
})
