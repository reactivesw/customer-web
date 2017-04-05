export const GET_CUSTOMER = 'auth/GET_CUSTOMER'
export const GET_TOKEN = 'auth/GET_TOKEN'
export const GET_IS_LOGGED_IN = 'auth/GET_IS_LOGGED_IN'
export const GET_CUSTOMER_ID = 'auth/GET_CUSTOMER_ID'

const getters = {
  [GET_CUSTOMER](state) {
    return state.customer
  },

  [GET_IS_LOGGED_IN](state, getters) {
    const customer = state.customer
    return customer && customer.id
  },

  [GET_TOKEN](state) {
    return state.token
  },

  [GET_CUSTOMER_ID](state, getters ) {
    const customer = state.customer
    return customer && customer.id
  }
}

export default getters

