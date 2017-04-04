export const GET_CUSTOMER_INFO = 'customer_info/GET_CUSTOMER_INFO'

const getters = {
  [GET_CUSTOMER_INFO](state) {
    return state.customerInfo
  }
}

export default getters
