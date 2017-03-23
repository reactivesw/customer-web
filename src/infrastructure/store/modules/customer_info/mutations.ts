import { SET_CUSTOMER_INFO,
  SET_DEFAULT_ADDRESS
} from '../../customer_info_types'

import CustomerInfo from '../../../../models/customer/CustomerInfo'
import SetDefaultRequest from '../../../../models/customer/SetDefaultRequest'

export default {
  [SET_CUSTOMER_INFO](state, customerInfo) {
    state.customerInfo = customerInfo
  },

  [SET_DEFAULT_ADDRESS](state, setDefaultResult: SetDefaultRequest) {
    let customerInfo: CustomerInfo = state.customerInfo
    customerInfo.version = setDefaultResult.version
    customerInfo.defaultAddressId = setDefaultResult.addressId
  }
}
