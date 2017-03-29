import { SET_CUSTOMER, SET_TOKEN } from 'src/infrastructure/store/auth_types'

const mutations = {
  [SET_CUSTOMER](state, customer) {
    state.customer = customer
  },

  [SET_TOKEN](state, token) {
    state.token = token
  }
}

export default mutations
