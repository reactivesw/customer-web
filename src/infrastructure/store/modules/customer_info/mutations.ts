import { SET_CUSTOMER_INFO } from '../../customer_info_types'

export default {
  [SET_CUSTOMER_INFO](state, customerInfo) {
    state.customerInfo = customerInfo
  }
}
