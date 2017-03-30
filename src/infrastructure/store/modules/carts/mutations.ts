import {
  SET_CART
} from 'src/infrastructure/store/carts_types'

const mutations = {
  [SET_CART](state, cart) {
    state.cart = cart
  }
}

export default mutations
