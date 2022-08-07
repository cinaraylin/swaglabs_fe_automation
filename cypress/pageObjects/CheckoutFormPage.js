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


    /****** OPERATIONAL METHODS  ******/

    static populateFirstNameFieldWithValue(firstName) {
        this.getFirstNameInput().type(firstName)
    }

    static populateLastNameFieldWithValue(lastName) {
        this.getLastNameInput().type(lastName)
    }

    static populatePostalCodeFieldWithValue(postalCode) {
        this.getPostalCodeInput().type(postalCode)
    }

    static clickContinueButton() {
        this.getContinueButton().click()
    }
}