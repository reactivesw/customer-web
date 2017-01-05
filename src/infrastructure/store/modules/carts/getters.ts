import { GET_CART } from '../../carts_types'

export default {
  [GET_CART](state) {
    return state.cart
  }
}
