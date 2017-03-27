import { GET_CUSTOMER_INFO } from 'src/infrastructure/store/customer_info_types'

export default {
  [GET_CUSTOMER_INFO](state) {
    return state.customerInfo
  }
}
