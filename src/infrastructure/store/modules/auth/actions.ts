import { auth as authApi } from 'src/infrastructure/api_client'
import { SIGN_UP, SIGN_IN, SET_CUSTOMER, SET_TOKEN, SIGN_OUT } from 'src/infrastructure/store/auth_types'
import { HIDE_SIGN_IN, HIDE_SIGN_UP, SHOW_SIGN_IN, SHOW_SIGN_UP } from 'src/infrastructure/store/modal_dialogs_types'
import { FETCH_CART } from 'src/infrastructure/store/carts_types'
import router from 'src/infrastructure/router'
import * as Vue from 'vue'

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

      // after signin or signout, customerId has changed, so that we need to fetch new cart for them.
      dispatch( FETCH_CART )
    }
  },

  async [SIGN_OUT]({ commit, dispatch }) {
    localStorage.removeItem('customer')
    authApi.signOut()
    commit(SET_CUSTOMER, {})

    // after signin or signout, customerId has changed, so that we need to fetch new cart for them.
    dispatch( FETCH_CART )

    router.push({ name: 'featureCategory' })
  }
}

export default actions
