export const SET_ORDERS = 'orders/SET_ORDERS'
export const SET_CURRENT_ORDER = 'orders/SET_CURRENT_ORDER'
export const RESET_ORDERS = 'orders/RESET_ORDERS'

const mutations = {
  [SET_ORDERS](state, orders) {
    state.orders = orders
  },

  [SET_CURRENT_ORDER](state, order) {
    state.currentOrder = order
  },

  [RESET_ORDERS](state) {
    state.orders = null
    state.currentOrder = null
  }
}

export default mutations
