import { BUTTON_LABELS, SORTING_OPTIONS } from "../../constants/common";
import { sortStringListDesc } from "../utils";

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

    
    /****** OPERATIONAL METHODS  ******/

    static addItemToCartByItemIndex(itemIndex) {
        this.getAddToCartButtonByItemIndex(itemIndex).click()
    }

    static goToShoppingCart() {
        this.getShoppingCart().click()
    }

    static sortItemsByNameDesc() {
        this.getSortingContainer().select(SORTING_OPTIONS.NAME_ZA)
    }

    static verifyItemsSortedByNameDesc() {
        const nameList = []
        this.getInventoryNames().each(item => {
            nameList.push(item.text())
        }).then(() => {
            const nameListSortedDesc = sortStringListDesc([...nameList])
            expect(JSON.stringify(nameList), "items sorted by name descending").to.eq(JSON.stringify(nameListSortedDesc))
        })
    }

    static goToInventoryDetailPageByItemIndex(itemIndex) {
        this.getInventoryNameByItemIndex(itemIndex).click()
    }

    static verifyAddToCartButtonIsNotVisibleByItemIndex(itemIndex) {
        this.getAddToCartButtonByItemIndex(itemIndex).should('not.exist')
    }
     
    static verifyRemoveButtonIsVisibleByItemIndex(itemIndex) {
        this.getRemoveButtonByItemIndex(itemIndex).should('be.visible')
    }

    static verifyCartIconHasBadgeWithCount(expectedItemCount) {
        this.getShoppingCartBadge().should('have.text', expectedItemCount)
    }
     
  }