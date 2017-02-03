import { GET_CUSTOMER, GET_TOKEN } from '../../auth_types'

export default {
  [GET_CUSTOMER](state) {
    return state.customer
  },

  [GET_TOKEN](state) {
    return state.token
  }
}
