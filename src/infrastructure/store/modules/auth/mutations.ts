export const SET_CUSTOMER = 'auth/SET_CUSTOMER'
export const SET_TOKEN = 'auth/SET_TOKEN'
export const RESET_CUSTOMER = 'auth/RESET_CUSTOMER'

export const INITIAL_VALUE = undefined

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
