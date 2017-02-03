import { SET_CUSTOMER, SET_TOKEN } from '../../auth_types'

export default {
  [SET_CUSTOMER](state, customer) {
    state.customer = customer
  },

  [SET_TOKEN](state, token) {
    state.token = token
  }
}
