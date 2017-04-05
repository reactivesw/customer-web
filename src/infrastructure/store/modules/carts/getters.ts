export const GET_CART = 'carts/GET_CART'
export const GET_IS_EMPTY = 'carts/GET_IS_EMPTY'
export const GET_TOTAL_PRICE = 'carts/GET_TOTAL_PRICE'

const getters = {
  [GET_CART](state) {
    return state.cart
  },

  [GET_IS_EMPTY](state) {
    const cart = state.cart
    const lineItems = cart && cart.lineItems
    return (!lineItems) || (lineItems.length === 0)
  },

  [GET_TOTAL_PRICE](state) {
    const cart = state.cart
    return cart && cart.totalPrice
  }
}

export default getters
