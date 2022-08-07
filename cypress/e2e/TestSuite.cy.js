/// <reference types="cypress" />

import { random } from "lodash"
import { LOCKED_OUT_USER_ERROR, PAGE_PATHS, PAYMENT_INFO, SHIPPING_INFO } from "../../constants/common"
import { USERS } from "../../constants/login"
import { CartPage } from "../pageObjects/CartPage"
import { CheckoutFormPage } from "../pageObjects/CheckoutFormPage"
import { HomePage } from "../pageObjects/HomePage"
import { faker } from '@faker-js/faker'
import { CheckoutOverviewPage } from "../pageObjects/CheckoutOverviewPage"
import { LoginPage } from "../pageObjects/LoginPage"
import { calculateTax, loginAs, convertPriceToNumber, calculateTotalPrice } from "../utils"
import { InventoryDetail } from "../pageObjects/InventoryDetail"

describe('example to-do app', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it("checkouts an item", () => {
        loginAs(USERS.PERFORMANCE_GLITCH_USER)
        
        HomePage.getInventoryItems().then(items => {
            const selectedItemIndex = random(items.length - 1)

            saveInventoryNameByIndexAndAlias(selectedItemIndex, 'item_name')
            saveInventoryDescriptionByIndexAndAlias(selectedItemIndex, 'item_description')
            saveInventoryPriceByIndexAndAlias(selectedItemIndex, 'item_price')

            HomePage.addItemToCartByItemIndex(selectedItemIndex)
            
            HomePage.verifyAddToCartButtonIsNotVisibleByItemIndex(selectedItemIndex)

            HomePage.verifyRemoveButtonIsVisibleByItemIndex(selectedItemIndex)
            
            HomePage.verifyCartIconHasBadgeWithCount(1)

            HomePage.goToShoppingCart()

            verifyPageUrlContains(PAGE_PATHS.CART_PAGE)

            CartPage.verifyItemCountInCartIs(1)

            getSavedValueByAlias('item_name').then(text => CartPage.verifyInventoryNameIs(text))
            getSavedValueByAlias('item_description').then(text => CartPage.verifyInventoryDescriptionIs(text))
            getSavedValueByAlias('item_price').then(text => CartPage.verifyInventoryPriceIs(text))

            CartPage.clickCheckoutButton()

            verifyPageUrlContains(PAGE_PATHS.CHECKOUT_FORM)

            // fill in the form
            CheckoutFormPage.populateFirstNameFieldWithValue(faker.name.findName())
            CheckoutFormPage.populateLastNameFieldWithValue(faker.name.lastName())
            CheckoutFormPage.populatePostalCodeFieldWithValue(faker.address.zipCode())

            CheckoutFormPage.clickContinueButton()

            verifyPageUrlContains(PAGE_PATHS.CHECKOUT_OVERVIEW)

            getSavedValueByAlias('item_name').then(text => CheckoutOverviewPage.verifyInventoryNameIs(text))
            getSavedValueByAlias('item_description').then(text => CheckoutOverviewPage.verifyInventoryDescriptionIs(text))

            CheckoutOverviewPage.verifyPaymentInformationIs(PAYMENT_INFO)
            CheckoutOverviewPage.verifyShippingInformationIs(SHIPPING_INFO)

            getSavedValueByAlias('item_price').then(itemPriceText => {
                CheckoutOverviewPage.verifyInventoryPriceIs(itemPriceText)
                CheckoutOverviewPage.verifySubTotalLabelIs('Item total: ' + itemPriceText)

                const itemPrice = convertPriceToNumber(itemPriceText)
                const tax = calculateTax(itemPrice)
                const priceWithTax = calculateTotalPrice(itemPrice, tax)

                CheckoutOverviewPage.verifyTaxLabelIs('Tax: $' + tax.toFixed(2))
                CheckoutOverviewPage.verifyTotalLabelIs('Total: $' + priceWithTax.toFixed(2))
            })

            CheckoutOverviewPage.clickFinishButton()
            verifyPageUrlContains(PAGE_PATHS.CHECKOUT_COMPLETE)
        })
    })

    it("sorts items", () => {
        loginAs(USERS.PROBLEM_USER)

        HomePage.sortItemsByNameDesc()

        HomePage.verifyItemsSortedByNameDesc()
    })

    it('goes to item detail page', () => {
        loginAs(USERS.STANDARD_USER)

        HomePage.getInventoryItems().then(items => {
            const selectedItemIndex = random(items.length - 1)

            saveInventoryNameByIndexAndAlias(selectedItemIndex, 'item_name')
            saveInventoryDescriptionByIndexAndAlias(selectedItemIndex, 'item_description')
            saveInventoryPriceByIndexAndAlias(selectedItemIndex, 'item_price')

            HomePage.goToInventoryDetailPageByItemIndex(selectedItemIndex)

            verifyPageUrlContains(PAGE_PATHS.INVENTORY_ITEM)

            // verify item name, desc and price
            getSavedValueByAlias('item_name').then(text => InventoryDetail.verifyInventoryNameIs(text))
            getSavedValueByAlias('item_description').then(text => InventoryDetail.verifyInventoryDescriptionIs(text))
            getSavedValueByAlias('item_price').then(text => InventoryDetail.verifyInventoryPriceIs(text))
        })
    })

    it('removes item from shopping cart', () => {
        loginAs(USERS.STANDARD_USER)

        HomePage.getInventoryItems().then(items => {
            const selectedItemIndex = random(items.length - 1)

            HomePage.addItemToCartByItemIndex(selectedItemIndex)

            HomePage.goToShoppingCart()

            verifyPageUrlContains(PAGE_PATHS.CART_PAGE)

            CartPage.verifyItemCountInCartIs(1)
            
            CartPage.clickRemoveButton()

            CartPage.verifyItemCountInCartIs(0)
        })
    })

    it("displays error message when trying to login with locked out user", () => {
        loginAs(USERS.LOCKED_OUT_USER)

        LoginPage.verifyErrorMessageDisplayedAs(LOCKED_OUT_USER_ERROR)
    })

    const saveInventoryNameByIndexAndAlias = (itemIndex, nameAlias) => HomePage.getInventoryNameByItemIndex(itemIndex).invoke('text').as(nameAlias)
    const saveInventoryDescriptionByIndexAndAlias = (itemIndex, descAlias) => HomePage.getInventoryDescriptionByItemIndex(itemIndex).invoke('text').as(descAlias)
    const saveInventoryPriceByIndexAndAlias = (itemIndex, priceAlias) => HomePage.getInventoryPriceByItemIndex(itemIndex).invoke('text').as(priceAlias)

    const getSavedValueByAlias = (alias) => cy.get(`@${alias}`)

    const verifyPageUrlContains = (path) => cy.url().should('contain', path)
    
})