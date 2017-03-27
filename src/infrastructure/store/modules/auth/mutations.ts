import { SET_CUSTOMER, SET_TOKEN } from 'src/infrastructure/store/auth_types'

export default {
  [SET_CUSTOMER](state, customer) {
    state.customer = customer
  },

  [SET_TOKEN](state, token) {
    state.token = token
  }
}
