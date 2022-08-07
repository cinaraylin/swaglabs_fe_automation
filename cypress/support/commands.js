import { LoginPage } from "../pageObjects/LoginPage"

Cypress.Commands.add('login', (username, password) => { 
    LoginPage.getUserNameInput().type(username)
    LoginPage.getPasswordInput().type(password)
    LoginPage.getLoginButton().click()
 })

Cypress.Commands.add('getBySel', (selector) => {
    return cy.get(`[data-test=${selector}]`)
 })
