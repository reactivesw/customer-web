export const SET_CUSTOMER_INFO = 'customer_info/SET_CUSTOMER_INFO'
export const RESET_CUSTOMER_INFO = 'customerInfo/RESET_CUSTOMER_INFO'

export const INITIAL_VALUE = undefined

const mutations = {
  [SET_CUSTOMER_INFO](state, customerInfo) {
    state.customerInfo = customerInfo
  },

  [RESET_CUSTOMER_INFO](state) {
    state.customerInfo = INITIAL_VALUE
  }
}

export default mutations
