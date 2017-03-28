import { GET_CUSTOMER, GET_TOKEN } from 'src/infrastructure/store/auth_types'

const getters = {
  [GET_CUSTOMER](state) {
    return state.customer
  },

  [GET_TOKEN](state) {
    return state.token
  }
}

export default getters

