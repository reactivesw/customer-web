export const SET_CART = 'carts/SET_CART'
export const RESET_CART = 'carts/RESET_CART'

export const INITIAL_VALUE = undefined

const mutations = {
  [SET_CART](state, cart) {
    state.cart = cart
  },

  [RESET_CART](state) {
    state.cart = INITIAL_VALUE
  }
}

export default mutations
