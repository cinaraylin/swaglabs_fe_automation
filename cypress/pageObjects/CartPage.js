import { BUTTON_LABELS } from "../../constants/common";

export class CartPage {
    static getHeader() {
      return cy.get('.title');
    }

    static getCartItems() {
        return cy.get('.cart_item')
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

    static getCheckoutButton() {
        return cy.getBySel('checkout')
    }

    static getRemoveButton() {
        return cy.contains('button', BUTTON_LABELS.REMOVE)
    }

    
    /****** OPERATIONAL METHODS  ******/
    
    static verifyItemCountInCartIs(expectedCount) {
        this.getCartItems().should('have.length', expectedCount)
    }

    static verifyInventoryNameIs(expectedName) {
        this.getInventoryItemName().should('have.text', expectedName)
    }

    static verifyInventoryDescriptionIs(expectedDesc) {
        this.getInventoryItemDescription().should('have.text', expectedDesc)
    }

    static verifyInventoryPriceIs(expectedPrice) {
        this.getInventoryItemPrice().should('have.text', expectedPrice)
    }
     
    static clickRemoveButton() {
        this.getRemoveButton().click()
    }

    static clickCheckoutButton() {
        this.getCheckoutButton().click()
    }
}