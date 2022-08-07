import { BUTTON_LABELS } from "../../constants/common";

export class HomePage {
    static getInventoryItems() {
      return cy.get('.inventory_item');
    }

    static getInventoryNames() {
        return cy.get('.inventory_item_name')
    }

    static getInventoryItemByItemIndex(index) {
        return cy.get('.inventory_item').eq(index)
    }

    static getInventoryNameByItemIndex(index) {
        return cy.get('.inventory_item').eq(index).find('.inventory_item_name')
    }

    static getInventoryDescriptionByItemIndex(index) {
        return cy.get('.inventory_item').eq(index).find('.inventory_item_desc')
    }

    static getInventoryPriceByItemIndex(index) {
        return cy.get('.inventory_item').eq(index).find('.inventory_item_price')
    }

    static getAddToCartButtonByItemIndex(index) {
        return cy.get('.inventory_item').eq(index).contains('button', BUTTON_LABELS.ADD_TO_CART, { matchCase: false })
    }

    static getRemoveButtonByItemIndex(index) {
        return cy.get('.inventory_item').eq(index).contains('button', BUTTON_LABELS.REMOVE, { matchCase: false })
    }

    static getShoppingCart() {
        return cy.get('.shopping_cart_link')
    }

    static getShoppingCartBadge() {
        return cy.get('.shopping_cart_badge')
    }

    static getSortingContainer() {
        return cy.getBySel('product_sort_container')
    }
  }