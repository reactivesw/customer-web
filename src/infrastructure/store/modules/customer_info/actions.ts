import { customerInfo as apiClient } from 'src/infrastructure/api_client'

import { FETCH_CUSTOMER_INFO,
  SET_DEFAULT_ADDRESS,
  PUT_DEFAULT_ADDRESS,
  SET_CUSTOMER_INFO
} from 'src/infrastructure/store/customer_info_types'

import ApiPutResult from 'src/models/customer/ApiPutResult'
import SetDefaultRequest from 'src/models/customer/SetDefaultRequest'

export default {
  async [FETCH_CUSTOMER_INFO]({ rootState, commit }) {
    const id = rootState.auth.customer.id
    const info = await apiClient.getCustomerInfo(id)
    commit(SET_CUSTOMER_INFO, info)
  },

  async [PUT_DEFAULT_ADDRESS]({ commit }, putDefaultRequest: SetDefaultRequest) {
    const result: ApiPutResult = await apiClient.setDefaultAddress(putDefaultRequest)

    // sync local state data with new version
    putDefaultRequest.version = result.version
    commit(SET_DEFAULT_ADDRESS, putDefaultRequest)
  }
}


