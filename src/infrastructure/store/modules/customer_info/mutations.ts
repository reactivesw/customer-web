import {
  SET_CUSTOMER_INFO,
  SET_DEFAULT_ADDRESS
} from 'src/infrastructure/store/customer_info_types'

import CustomerInfo from 'src/models/customer/CustomerInfo'
import SetDefaultRequest from 'src/models/customer/SetDefaultRequest'

const mutations = {
  [SET_CUSTOMER_INFO](state, customerInfo) {
    state.customerInfo = customerInfo
  },

  [SET_DEFAULT_ADDRESS](state, setDefaultResult: SetDefaultRequest) {
    let customerInfo: CustomerInfo = state.customerInfo
    customerInfo.version = setDefaultResult.version
    customerInfo.defaultAddressId = setDefaultResult.addressId
  }
}

export default mutations
