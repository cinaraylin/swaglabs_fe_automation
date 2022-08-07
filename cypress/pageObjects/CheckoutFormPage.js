export class CheckoutFormPage {
    static getHeader() {
      return cy.get('.title');
    }

    static getFirstNameInput() {
        return cy.getBySel('firstName')
    }

    static getLastNameInput() {
        return cy.getBySel('lastName')
    }

    static getPostalCodeInput() {
        return cy.getBySel('postalCode')
    }

    static getContinueButton() {
        return cy.getBySel('continue')
    }
}