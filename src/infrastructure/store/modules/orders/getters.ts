export const GET_ORDERS = 'orders/GET_ORDERS'
export const GET_CURRENT_ORDER = 'orders/GET_CURRENT_ORDER'

const getters = {
  [GET_ORDERS] (state) {
    return state.orders
  },

  [GET_CURRENT_ORDER] (state) {
    return state.currentOrder
  }
}

export default getters
