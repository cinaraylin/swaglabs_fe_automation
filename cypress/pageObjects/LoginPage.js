export class LoginPage {
    static getUserNameInput() {
        return cy.getBySel('username')
    }

    static getPasswordInput() {
        return cy.getBySel('password')
    }

    static getLoginButton() {
        return cy.getBySel('login-button')
    }


    static getErrorMessageElement() {
        return cy.getBySel('error')
    }


    /****** OPERATIONAL METHODS  ******/
    
    static verifyErrorMessageDisplayedAs(expectedErrorMessage) {
        this.getErrorMessageElement().should('have.text', expectedErrorMessage)
    }
}