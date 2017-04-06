export const GET_CURRENT_ORDER = 'orders/GET_CURRENT_ORDER'

const getters = {
  [GET_CURRENT_ORDER]( state ) {
    return state.currentOrder
  }
}

export default getters
