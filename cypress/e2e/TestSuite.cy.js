/// <reference types="cypress" />

import { random } from "lodash"
import { LOCKED_OUT_USER_ERROR, PAGE_PATHS, PAYMENT_INFO, SHIPPING_INFO, SORTING_OPTIONS } from "../../constants/common"
import { PASSWORD, USERS } from "../../constants/login"
import { CartPage } from "../pageObjects/CartPage"
import { CheckoutFormPage } from "../pageObjects/CheckoutFormPage"
import { HomePage } from "../pageObjects/HomePage"
import { faker } from '@faker-js/faker'
import { CheckoutOverviewPage } from "../pageObjects/CheckoutOverviewPage"
import { LoginPage } from "../pageObjects/LoginPage"
import { sortStringListDesc } from "../../utils"
import { InventoryDetail } from "../pageObjects/InventoryDetail"

describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it("checkouts an item",function() {
        loginAs(USERS.PERFORMANCE_GLITCH_USER)
        
        HomePage.getInventoryItems().then(items => {
            const selectedItemIndex = random(items.length - 1)

            HomePage.getInventoryNameByItemIndex(selectedItemIndex).invoke('text').as('item_name')
            HomePage.getInventoryDescriptionByItemIndex(selectedItemIndex).invoke('text').as('item_description')
            HomePage.getInventoryPriceByItemIndex(selectedItemIndex).invoke('text').as('item_price')

            // add to cart
            HomePage.getAddToCartButtonByItemIndex(selectedItemIndex).click()
            
            // assert add to cart button no more visible
            HomePage.getAddToCartButtonByItemIndex(selectedItemIndex).should('not.exist')

            // assert remove button is visible
            HomePage.getRemoveButtonByItemIndex(selectedItemIndex).should('be.visible')
            
            // assert basket icon has badge with item count 1
            HomePage.getShoppingCartBadge().should('have.text', '1')

            // Go to shopping cart
            HomePage.getShoppingCart().click()

            // verify you are on basket 
            cy.url().should('contain', PAGE_PATHS.CART_PAGE)

            // verify item name, desc and price
            CartPage.getCartItems().should('have.length', 1)
            cy.get('@item_name').then(text => CartPage.getInventoryItemName().should('have.text', text))
            cy.get('@item_description').then(text => CartPage.getInventoryItemDescription().should('have.text', text))
            cy.get('@item_price').then(text => CartPage.getInventoryItemPrice().should('have.text', text))

            CartPage.getCheckoutButton().click()

            // assert page header
            cy.url().should('contain', PAGE_PATHS.CHECKOUT_FORM)

            // fill in the form
            CheckoutFormPage.getFirstNameInput().type(faker.name.findName())
            CheckoutFormPage.getLastNameInput().type(faker.name.lastName())
            CheckoutFormPage.getPostalCodeInput().type(faker.address.zipCode())

            CheckoutFormPage.getContinueButton().click()

            // assert checkout overview page header
            cy.url().should('contain', PAGE_PATHS.CHECKOUT_OVERVIEW)

            cy.get('@item_name').then(text => CheckoutOverviewPage.getInventoryItemName().should('have.text', text))
            cy.get('@item_description').then(text => CheckoutOverviewPage.getInventoryItemDescription().should('have.text', text))

            CheckoutOverviewPage.getPaymentInformation().should('have.text', PAYMENT_INFO)
            CheckoutOverviewPage.getShippingInformation().should('have.text', SHIPPING_INFO)

            cy.get('@item_price').then(itemPriceText => {
                CheckoutOverviewPage.getInventoryItemPrice().should('have.text', itemPriceText)
                CheckoutOverviewPage.getSubTotalLabel().should('have.text', 'Item total: ' + itemPriceText)

                const itemPrice = priceAsNumber(itemPriceText)
                const tax = calculateTax(itemPrice)
                const priceWithTax = totalPrice(itemPrice, tax)

                CheckoutOverviewPage.getTaxLabel().should('have.text', 'Tax: $' + tax.toFixed(2))
                CheckoutOverviewPage.getTotalLabel().should('have.text', 'Total: $' + priceWithTax.toFixed(2))
            })
            CheckoutOverviewPage.getFinishButton().click()

            // assert completion
            cy.url().should('contain', PAGE_PATHS.CHECKOUT_COMPLETE)
            
        })
    })

    it("sorts items", () => {
        loginAs(USERS.PROBLEM_USER)

        HomePage.getSortingContainer().select(SORTING_OPTIONS.NAME_ZA)

        const nameList = []
        HomePage.getInventoryNames().each(item => {
            nameList.push(item.text())
        }).then(() => {
            const nameListSortedDesc = sortStringListDesc([...nameList])
            expect(JSON.stringify(nameList)).to.eq(JSON.stringify(nameListSortedDesc))
        })

    })

    it("displays error message when logging in with locked out user", () => {
        loginAs(USERS.LOCKED_OUT_USER)

        LoginPage.getErrorMessageElement().should('have.text', LOCKED_OUT_USER_ERROR)
    })

    it('removes item from shopping cart', () => {
        loginAs(USERS.STANDARD_USER)

        HomePage.getInventoryItems().then(items => {
            const selectedItemIndex = random(items.length - 1)

            HomePage.getInventoryNameByItemIndex(selectedItemIndex).invoke('text').as('item_name')
            HomePage.getInventoryDescriptionByItemIndex(selectedItemIndex).invoke('text').as('item_description')
            HomePage.getInventoryPriceByItemIndex(selectedItemIndex).invoke('text').as('item_price')

            // go to detail page
            HomePage.getInventoryNameByItemIndex(selectedItemIndex).click()

            // assertPageUrl
            cy.url().should('contain', PAGE_PATHS.INVENTORY_ITEM)

            // verify item name, desc and price
            cy.get('@item_name').then(text => InventoryDetail.getInventoryDetailName().should('have.text', text))
            cy.get('@item_description').then(text => InventoryDetail.getInventoryDetailDescription().should('have.text', text))
            cy.get('@item_price').then(text => InventoryDetail.getInventoryDetailPrice().should('have.text', text))
        })
    })

    it('goes to item detail page', () => {
        loginAs(USERS.STANDARD_USER)

        HomePage.getInventoryItems().then(items => {
            const selectedItemIndex = random(items.length - 1)

            HomePage.getInventoryNameByItemIndex(selectedItemIndex).invoke('text').as('item_name')

            // add to cart
            HomePage.getAddToCartButtonByItemIndex(selectedItemIndex).click()

            // Go to shopping cart
            HomePage.getShoppingCart().click()

            // verify you are on basket 
            cy.url().should('contain', PAGE_PATHS.CART_PAGE)
            CartPage.getCartItems().should('have.length', 1)

            CartPage.getRemoveButton().click()
            CartPage.getCartItems().should('have.length', 0)
        })
    })

    const loginAs = (userName) => cy.login(userName, PASSWORD)

    const priceAsNumber = (priceWithCurrency) => Number(priceWithCurrency.replace(/[^0-9.-]+/g,""))
    const calculateTax = (price) => price * 0.08
    const totalPrice = (itemTotal, tax) => itemTotal + tax
})