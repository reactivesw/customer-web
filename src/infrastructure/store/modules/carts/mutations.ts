import { SET_CART } from 'src/infrastructure/store/carts_types'

export default {
  [SET_CART](state, cart) {
    state.cart = cart
  }
}
