import { GET_CUSTOMER, GET_TOKEN, GET_IS_LOGGED_IN } from 'src/infrastructure/store/auth_types'

const getters = {
  [GET_CUSTOMER](state) {
    return state.customer
  },

  [GET_IS_LOGGED_IN](state, getters) {
    return !! getters[GET_CUSTOMER]['id']
  },

  [GET_TOKEN](state) {
    return state.token
  }
}

export default getters

