import { SET_CUSTOMER, SET_TOKEN } from 'src/infrastructure/store/auth_types'

export const INITIAL_VALUE = undefined
export const RESET_CUSTOMER = 'auth/RESET_CUSTOMER'
const mutations = {
  [SET_CUSTOMER](state, customer) {
    state.customer = customer
  },

  [SET_TOKEN](state, token) {
    state.token = token
  },

  [RESET_CUSTOMER](state) {
    state.customer = INITIAL_VALUE
  }
}

export default mutations
