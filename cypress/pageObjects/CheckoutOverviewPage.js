export class CheckoutOverviewPage {
    static getHeader() {
      return cy.get('.title');
    }

    static getInventoryItemName() {
        return cy.get('.inventory_item_name')
    }

    static getInventoryItemDescription() {
        return cy.get('.inventory_item_desc')
    }

    static getInventoryItemPrice() {
        return cy.get('.inventory_item_price')
    }

    static getPaymentInformation() {
        return cy.get('.summary_value_label').eq(0)
    }

    static getShippingInformation() {
        return cy.get('.summary_value_label').eq(1)
    }

    static getSubTotalLabel() {
        return cy.get('.summary_subtotal_label')
    }

    static getTaxLabel() {
        return cy.get('.summary_tax_label')
    }

    static getTotalLabel() {
        return cy.get('.summary_total_label')
    }

    static getFinishButton() {
        return cy.getBySel('finish')
    }

    
    /****** OPERATIONAL METHODS  ******/
    
    static verifyInventoryNameIs(expectedName) {
        this.getInventoryItemName().should('have.text', expectedName)
    }

    static verifyInventoryDescriptionIs(expectedDesc) {
        this.getInventoryItemDescription().should('have.text', expectedDesc)
    }

    static verifyInventoryPriceIs(expectedPrice) {
        this.getInventoryItemPrice().should('have.text', expectedPrice)
    }

    static verifyPaymentInformationIs(expectedPayment) {
        this.getPaymentInformation().should('have.text', expectedPayment)
    }

    static verifyShippingInformationIs(expectedShipping) {
        this.getShippingInformation().should('have.text', expectedShipping)
    }

    static verifySubTotalLabelIs(expectedSubTotal) {
        this.getSubTotalLabel().should('have.text', expectedSubTotal)
    }

    static verifyTaxLabelIs(expectedTax) {
        this.getTaxLabel().should('have.text', expectedTax)
    }

    static verifyTotalLabelIs(expectedTotal) {
        this.getTotalLabel().should('have.text', expectedTotal)
    }

    static clickFinishButton() {
        this.getFinishButton().click()
    }
}