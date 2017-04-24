import { carts as cartsApi } from 'src/infrastructure/api_client'

import { SET_CART } from 'src/infrastructure/store/modules/carts/mutations'

import { GET_CART } from './getters'
import { AddLineItem, RemoveLineItem, SetLineItemQuantity } from 'src/infrastructure/api_client/carts'

export const FETCH_CART = 'carts/FETCH_CART'
export const ADD_TO_CART = 'carts/ADD_TO_CART'
export const REMOVE_LINE_ITEM = 'carts/REMOVE_LINE_ITEM'
export const SET_LINE_ITEM_QUANTITY = 'carts/SET_LINE_ITEM_QUANTITY'

const actions = {
  /**
   * fetch current cart from server
   */
  async[FETCH_CART]({ commit, getters }, forceFetch = false) {
    let cart = getters[GET_CART]
    if (forceFetch || !cart) {
      cart = await cartsApi.getCart()
      commit(SET_CART, cart)
    }
    return cart
  },

  /**
   * add lineItem to cart
   * @param lineItem
   * @returns {Promise<void>}
   */
  async[ADD_TO_CART]({ commit, getters, dispatch }, lineItem: AddLineItem) {
    let cart = await dispatch(FETCH_CART)
    cart = await cartsApi.addToCart(cart.id, cart.version, lineItem)
    commit(SET_CART, cart)
    return cart
  },

  /**
   * remove lineItem
   * @param lineItem
   * @returns {Promise<void>}
   */
  async[REMOVE_LINE_ITEM]({ getters, commit, dispatch }, lineItem: RemoveLineItem) {
    let cart = await dispatch(FETCH_CART)
    cart = await cartsApi.removeLineItem(cart.id, cart.version, lineItem)
    commit(SET_CART, cart)
    return cart
  },

  /**
   * change lineItem quantity
   * @param lineItem
   * @returns {Promise<void>}
   */
  async[SET_LINE_ITEM_QUANTITY]({ getters, commit, dispatch }, lineItem: SetLineItemQuantity) {
    let cart = await dispatch(FETCH_CART)
    cart = await cartsApi.changeLineItemQuantity(cart.id, cart.version, lineItem)
    commit(SET_CART, cart)
    return cart
  }
}

export default actions

