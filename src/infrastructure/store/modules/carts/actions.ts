import { carts as cartsApi } from 'src/infrastructure/api_client'
import Cookies = require('js-cookie')
import {
  ADD_TO_CART,
  REMOVE_LINE_ITEM,
  FETCH_CART,
  SET_CART,
  SET_LINE_ITEM_QUANTITY } from '../../carts_types'

export default {
  async [FETCH_CART]({ commit }) {
    const anonymousId = 'anonymousId2' // TODO: Cookies.get('anonymousId')
    const cart = await cartsApi.getCart({ anonymousId })
    commit(SET_CART, cart)
  },

  /**
   * payload has following fields:
   * - productId
   * - variantId
   * - quantity
   *
   * @param {any} { state, commit }
   * @param {any} payload
   */
  async [ADD_TO_CART]({ state, commit }, payload) {
    const cart = await cartsApi.addToCart(state.cart.id, state.cart.version, payload)
    commit(SET_CART, cart)
  },

  /**
   * payload has following fields:
   * - lineItemId
   *
   * @param {any} { state, commit }
   * @param {any} payload
   */
  async [REMOVE_LINE_ITEM]({ state, commit }, payload) {
    const cart = await cartsApi.removeLineItem(state.cart.id, state.cart.version, payload)
    commit(SET_CART, cart)
  },

  /**
   * payload has following fields:
   * - lineItemId
   * - quantity
   *
   * @param {any} { state, commit }
   * @param {any} payload
   */
  async [SET_LINE_ITEM_QUANTITY]({ state, commit }, payload) {
    const cart = await cartsApi.changeLineItemQuantity(state.cart.id, state.cart.version, payload)
    commit(SET_CART, cart)
  }
}
