export const SET_CURRENT_ORDER = 'orders/SET_CURRENT_ORDER'

const mutations = {
  [SET_CURRENT_ORDER] ( state, order ) {
    state.currentOrder = order
  }
}

export default mutations
