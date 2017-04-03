import { customerInfo as apiClient } from 'src/infrastructure/api_client'

import {
  FETCH_CUSTOMER_INFO,
  SET_CUSTOMER_INFO,
  CHANGE_DEFAULT_ADDRESS,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  UPDATE_CUSTOMER_INFO
} from 'src/infrastructure/store/customer_info_types'

import { GET_CUSTOMER_ID } from 'src/infrastructure/store/auth_types'

const actions = {
  async[FETCH_CUSTOMER_INFO]({ rootState, commit, getters }) {
    const id = getters[GET_CUSTOMER_ID]
    const info = await apiClient.getCustomerInfo(id)
    commit(SET_CUSTOMER_INFO, info)
  },

  async[CHANGE_DEFAULT_ADDRESS]({ commit }, request) {
    const customerInfo = await apiClient.setDefaultAddress(request)
    commit(SET_CUSTOMER_INFO, customerInfo)
  },

  async[ADD_ADDRESS]({ commit }, request) {
    const customerInfo = await apiClient.addAddress(request)
    commit(SET_CUSTOMER_INFO, customerInfo)
  },

  async[UPDATE_ADDRESS]({ commit }, request) {
    const customerInfo = await apiClient.updateAddress(request)
    commit(SET_CUSTOMER_INFO, customerInfo)
  },

  async[DELETE_ADDRESS]({ commit }, request) {
    const customerInfo = await apiClient.deleteAddress(request)
    commit(SET_CUSTOMER_INFO, customerInfo)
  },

  async[UPDATE_CUSTOMER_INFO]({ commit }, request) {
    const customerInfo = await apiClient.updateCustomerInfo(request)
    commit(SET_CUSTOMER_INFO, customerInfo)
  }
}

export default actions
