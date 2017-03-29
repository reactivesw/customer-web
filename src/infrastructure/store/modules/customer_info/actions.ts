import { customerInfo as apiClient } from 'src/infrastructure/api_client'

import {
  FETCH_CUSTOMER_INFO,
  SET_CUSTOMER_INFO,
  PUT_DEFAULT_ADDRESS,
  PUT_ADD_ADDRESS,
  PUT_UPDATE_ADDRESS
} from 'src/infrastructure/store/customer_info_types'

import SetDefaultRequest from 'src/models/customer/SetDefaultRequest'
import AddAddressRequest from 'src/models/customer/AddAddressRequest'
import UpdateAddressRequest from 'src/models/customer/UpdateAddressRequest'

const actions = {
  async [FETCH_CUSTOMER_INFO]({ rootState, commit }) {
    const id = rootState.auth.customer.id
    const info = await apiClient.getCustomerInfo(id)
    commit(SET_CUSTOMER_INFO, info)
  },

  async [PUT_DEFAULT_ADDRESS]({ commit }, putDefaultRequest: SetDefaultRequest) {
    const customerInfo = await apiClient.setDefaultAddress(putDefaultRequest)
    commit(SET_CUSTOMER_INFO, customerInfo)
  },

  async [PUT_ADD_ADDRESS]({ commit }, addAddressRequest: AddAddressRequest) {
    const customerInfo  = await apiClient.addAddress(addAddressRequest)
    commit(SET_CUSTOMER_INFO, customerInfo)
  },

  async [PUT_UPDATE_ADDRESS]({ commit }, updateAddressRequest: UpdateAddressRequest) {
    const customerInfo  = await apiClient.updateAddress(updateAddressRequest)
    commit(SET_CUSTOMER_INFO, customerInfo)
  }
}

export default actions


