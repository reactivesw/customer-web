import { SET_CART } from '../../carts_types'

export default {
  [SET_CART](state, cart) {
    state.cart = cart
  }
}
