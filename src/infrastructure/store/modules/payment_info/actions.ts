import { paymentInfo as apiClient } from 'src/infrastructure/api_client'

import { GET_CUSTOMER_ID, GET_IS_LOGGED_IN }
  from 'src/infrastructure/store/auth_types'

import { GET_PAYMENTS } from './getters'
import { SET_PAYMENTS } from './mutations'

export const FETCH_PAYMENTS = 'customer_info/FETCH_PAYMENTS'
export const ADD_CREDIT_CARD = 'customer_info/ADD_CREDIT_CARD'
export const SET_SELECTED = 'customer_info/SET_SELECTED'
export const DELETE_CREDIT_CARD = 'customer_info/DELETE_CREDIT_CARD'

const actions = {
  async[FETCH_PAYMENTS]({ commit, getters }, forceFetch = false) {
    const isLoggedIn = getters[GET_IS_LOGGED_IN]
    if (isLoggedIn) {
      if (forceFetch || !getters[GET_PAYMENTS]) {
        const id = getters[GET_CUSTOMER_ID]
        const payments = await apiClient.getPayments(id)
        commit(SET_PAYMENTS, payments)
      }
    }
  },

  async[ADD_CREDIT_CARD]({ commit }, request) {
    const payment = await apiClient.addCreditCard(request)
    // only return the newly created payment
    commit(SET_PAYMENTS, [payment])
  },

  async[SET_SELECTED]({ commit }, request) {
    const payments = await apiClient.setSelected(request)
    commit(SET_PAYMENTS, payments)
  },

  async[DELETE_CREDIT_CARD]({ commit }, request) {
    const payments = await apiClient.deleteCreditCard(request)
    commit(SET_PAYMENTS, payments)
  }
}

export default actions
