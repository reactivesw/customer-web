import { GET_CART } from 'src/infrastructure/store/carts_types'

export const GET_IS_EMPTY = 'carts/GET_IS_EMPTY'
export const GET_TOTAL_PRICE = 'carts/GET_TOTAL_PRICE'
const getters = {
  [GET_CART](state) {
    return state.cart
  },

  [GET_IS_EMPTY](state) {
    const lineItems = state.cart.lineItems
    return (!lineItems) || (lineItems.length === 0)
  },

  [GET_TOTAL_PRICE](state) {
    return state.cart.totalPrice
  }
}

export default getters
