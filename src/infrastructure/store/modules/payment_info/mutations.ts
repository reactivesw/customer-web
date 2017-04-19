export const SET_PAYMENTS = 'customer_info/SET_PAYMENTS'
export const RESET_PAYMENTS = 'customer_info/SET_PAYMENTS'

export const INITIAL_VALUE = undefined

const mutations = {
  [SET_PAYMENTS](state, payments) {
    state.payments = payments
  },

  [RESET_PAYMENTS](state) {
    state.payments = INITIAL_VALUE
  }
}

export default mutations
