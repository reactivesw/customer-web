import { GET_CART } from 'src/infrastructure/store/carts_types'

const getters = {
  [GET_CART](state) {
    return state.cart
  }
}

export default getters
