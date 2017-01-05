import { getCart, addToCart, changeLineItemQuantity } from 'src/infrastructure/api_client'
import Cookies = require('js-cookie')
import {
  ADD_TO_CART,
  FETCH_CART,
  SET_CART,
  SET_LINE_ITEM_QUANTITY } from '../../carts_types'

export default {
  async [FETCH_CART]({ commit }) {
    const anonymousId = 'anonymousId2' // TODO: Cookies.get('anonymousId')
    const cart = await getCart({ anonymousId })
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
    const cart = await addToCart(state.cart.id, state.cart.version, payload)
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
    const cart = await changeLineItemQuantity(state.cart.id, state.cart.version, payload)
    commit(SET_CART, cart)
  }
}
