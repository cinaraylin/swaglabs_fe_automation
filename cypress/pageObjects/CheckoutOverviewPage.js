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
}