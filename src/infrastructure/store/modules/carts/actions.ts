import { carts as cartsApi } from 'src/infrastructure/api_client'
import {
  ADD_TO_CART,
  REMOVE_LINE_ITEM,
  FETCH_CART,
  SET_CART,
  SET_LINE_ITEM_QUANTITY } from 'src/infrastructure/store/carts_types'

const actions = {
  async [FETCH_CART]({ commit }) {
    // we only want our cart, api client will handle it for us
    // const anonymousId = 'anonymousId2'
    const cart = await cartsApi.getCart()
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

export default actions

