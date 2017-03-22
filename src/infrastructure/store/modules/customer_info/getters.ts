import { GET_CUSTOMER_INFO } from '../../customer_info_types'

export default {
  [GET_CUSTOMER_INFO](state) {
    return state.customerInfo
  }
}
