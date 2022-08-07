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
}