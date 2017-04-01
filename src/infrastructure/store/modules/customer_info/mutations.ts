import {
  SET_CUSTOMER_INFO
} from 'src/infrastructure/store/customer_info_types'

import CustomerInfo from 'src/models/customer/CustomerInfo'

const mutations = {
  [SET_CUSTOMER_INFO](state, customerInfo) {
    state.customerInfo = customerInfo
  }
}

export default mutations
