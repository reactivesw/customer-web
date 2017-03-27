import { GET_CART } from 'src/infrastructure/store/carts_types'

export default {
  [GET_CART](state) {
    return state.cart
  }
}
