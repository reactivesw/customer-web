import { customerInfo as apiClient } from 'src/infrastructure/api_client'

import { SET_CUSTOMER_INFO }
  from 'src/infrastructure/store/modules/customer_info/mutations'

import { GET_CUSTOMER_ID } from 'src/infrastructure/store/auth_types'

export const FETCH_CUSTOMER_INFO = 'customer_info/FETCH_CUSTOMER_INFO'
export const CHANGE_DEFAULT_ADDRESS = 'customer_info/CHANGE_DEFAULT_ADDRESS'
export const ADD_ADDRESS = 'customer_info/ADD_ADDRESS'
export const UPDATE_ADDRESS = 'customer_info/UPDATE_ADDRESS'
export const DELETE_ADDRESS = 'customer_info/DELETE_ADDRESS'
export const UPDATE_CUSTOMER_INFO = 'customer_info/UPDATE_CUSTOMER_INFO'


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
