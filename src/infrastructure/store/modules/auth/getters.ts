import { GET_CUSTOMER, GET_TOKEN,
  GET_IS_LOGGED_IN, GET_CUSTOMER_ID }
  from 'src/infrastructure/store/auth_types'

const getters = {
  [GET_CUSTOMER](state) {
    return state.customer
  },

  [GET_IS_LOGGED_IN](state, getters) {
    const customer = getters[GET_CUSTOMER]
    return customer && customer.id
  },

  [GET_TOKEN](state) {
    return state.token
  },

  [GET_CUSTOMER_ID](state, getters ) {
    const customer = getters[GET_CUSTOMER]
    return customer && customer.id
  }
}

export default getters

