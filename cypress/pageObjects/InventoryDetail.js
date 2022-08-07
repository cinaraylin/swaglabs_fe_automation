export class InventoryDetail {
    static getInventoryDetailName() {
        return cy.get('.inventory_details_name')
    }

    static getInventoryDetailDescription() {
        return cy.get('.inventory_details_desc')
    }

    static getInventoryDetailPrice() {
        return cy.get('.inventory_details_price')
    }


    /****** OPERATIONAL METHODS  ******/
    
    static verifyInventoryNameIs(expectedName) {
        this.getInventoryDetailName().should('have.text', expectedName)
    }

    static verifyInventoryDescriptionIs(expectedDesc) {
        this.getInventoryDetailDescription().should('have.text', expectedDesc)
    }

    static verifyInventoryPriceIs(expectedPrice) {
        this.getInventoryDetailPrice().should('have.text', expectedPrice)
    }
     
}