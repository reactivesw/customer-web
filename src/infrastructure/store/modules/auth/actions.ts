import { auth as authApi } from 'src/infrastructure/api_client'
import { SIGN_UP, SIGN_IN, SET_CUSTOMER, SET_TOKEN, SIGN_OUT }
  from 'src/infrastructure/store/auth_types'
import { HIDE_SIGN_IN, HIDE_SIGN_UP, SHOW_SIGN_IN, SHOW_SIGN_UP }
  from 'src/infrastructure/store/modal_dialogs_types'
import { FETCH_CUSTOMER_INFO }
  from 'src/infrastructure/store/modules/customer_info/actions'
import { FETCH_CART }
  from 'src/infrastructure/store/modules/carts/actions'
import { RESET_CUSTOMER_INFO }
  from 'src/infrastructure/store/modules/customer_info/mutations'
import { RESET_CART }
  from 'src/infrastructure/store/modules/carts/mutations'

import router from 'src/infrastructure/router'
import Vue from 'vue'

const actions = {

  async [SIGN_UP]({ commit, dispatch }, { email, password }) {
    const customer = await authApi.signUp(email, password)

    if (customer) {
      dispatch(HIDE_SIGN_UP)
      dispatch(SHOW_SIGN_IN)
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

      localStorage.setItem('customer', JSON.stringify(customer))
      commit(SET_CUSTOMER, customer)

      // get customer-related info and cart data
      dispatch(FETCH_CUSTOMER_INFO)
      dispatch(FETCH_CART)
    }
  },

  [SIGN_OUT]({ commit }) {
    localStorage.removeItem('customer')
    authApi.signOut()
    commit(SET_CUSTOMER, undefined)

    // clear customer-realted data
    commit(RESET_CUSTOMER_INFO)
    commit(RESET_CART)

    // go home
    router.push({ name: 'home' })
  }
}

export default actions
