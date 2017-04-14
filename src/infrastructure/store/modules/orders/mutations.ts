export const SET_ORDERS = 'orders/SET_ORDERS'
export const SET_CURRENT_ORDER = 'orders/SET_CURRENT_ORDER'

const mutations = {
  [SET_ORDERS] (state, orders) {
    state.orders = orders
  },

  [SET_CURRENT_ORDER] (state, order) {
    state.currentOrder = order
  }
}

export default mutations
