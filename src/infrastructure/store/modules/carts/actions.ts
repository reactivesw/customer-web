import { getCart, addToCart } from 'src/infrastructure/api_client'
import Cookies = require('js-cookie')
import {
  ADD_TO_CART,
  FETCH_CART,
  SET_CART } from '../../carts_types'

export default {
  async [FETCH_CART]({ commit }) {
    const anonymousId = 'anonymousId2' // TODO: Cookies.get('anonymousId')
    const cart = await getCart({ anonymousId })
    commit(SET_CART, cart)
  },

  async [ADD_TO_CART]({ state, commit }, { productId, variantId, quantity }) {
    const anonymousId = 'anonymousId2' // TODO: Cookies.get('anonymousId')
    const cartId = state.cart.id
    const cartVersion = state.cart.version
    const lineitemDraft = {
      productId,
      variantId,
      quantity: quantity || 1
    }
    const cart = await addToCart({
      cartId,
      lineitemDraft,
      cartVersion
    })
    commit(SET_CART, cart)
  }
}
