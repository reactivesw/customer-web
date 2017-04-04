export const SET_PAYMENTS = 'customer_info/SET_PAYMENTS'

export const INITIAL_VALUE = undefined

const mutations = {
  [SET_PAYMENTS](state, payments) {
    state.payments = payments
  }
}

export default mutations
