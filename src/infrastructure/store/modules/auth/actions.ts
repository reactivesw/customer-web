import { auth as authApi } from 'src/infrastructure/api_client'
import { SIGN_UP, SIGN_IN, SET_CUSTOMER, SET_TOKEN, SIGN_OUT } from '../../auth_types'
import { HIDE_SIGN_IN, HIDE_SIGN_UP } from '../../modal_dialogs_types'
import router from 'src/infrastructure/router'
import * as Vue from 'vue'

export default {

  async [SIGN_UP]({ commit, dispatch }, { email, password }) {
    try {
      const customer = await authApi.signUp(email, password)

      if (customer) {
        dispatch(HIDE_SIGN_IN)
        dispatch(HIDE_SIGN_UP)

        localStorage.setItem('customer', JSON.stringify(customer))
        commit(SET_CUSTOMER, customer)
      }
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        // like 401 for requesting unauthorized resource
        switch (error.response.status) {
          case 409:
            alert(Vue['t']('alert.email_taken'))
            break
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        alert(Vue['t']('alert.network_error'))
      }
    }
  },

  /**
   * Sign in to backend, authInfo should be a object.
   *
   * - Google Sign in
   * { type: 'google', id_token: 'id_token provided by google sign in' }
   *
   * @param {any} { commit }
   * @param {any} authInfo
   */
  async [SIGN_IN]({ rootState, commit, dispatch }, authInfo) {
    let customer
    if (authInfo.type === 'email') {
      customer = await authApi.emailSignIn(authInfo.email, authInfo.pwd)
    } else if (authInfo.type === 'google') {
      customer = await authApi.googleSignIn(authInfo.id_token)
    } else if (authInfo.type === 'facebook') {
      // TODO: wait for sign in api
    }

    if (customer) {
      dispatch(HIDE_SIGN_IN)
      dispatch(HIDE_SIGN_UP)

      localStorage.setItem('customer', JSON.stringify(customer.customer))
      localStorage.setItem('token', JSON.stringify(customer.token))
      commit(SET_CUSTOMER, customer.customer)
      commit(SET_TOKEN, customer.token)
    }
  },

  async [SIGN_OUT]({ commit }) {
    localStorage.removeItem('customer')
    localStorage.removeItem('token')
    authApi.signOut()
    commit(SET_CUSTOMER, {})
    commit(SET_TOKEN, '')
    router.push({ name: 'featureCategory' })
  }
}
