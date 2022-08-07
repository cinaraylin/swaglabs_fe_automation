import { PASSWORD } from "../constants/login"

export const loginAs = (userName) => cy.login(userName, PASSWORD)

export const sortStringListDesc = (stringList) => stringList.sort().reverse()

export const convertPriceToNumber = (priceWithCurrency) => Number(priceWithCurrency.replace(/[^0-9.-]+/g,""))

export const calculateTax = (price) => price * 0.08

export const calculateTotalPrice = (itemTotal, tax) => itemTotal + tax