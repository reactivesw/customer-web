import { auth as authApi } from 'src/infrastructure/api_client'
import { HIDE_SIGN_IN, HIDE_SIGN_UP, SHOW_SIGN_IN } from 'src/infrastructure/store/modal_dialogs_types'
import { FETCH_CUSTOMER_INFO } from 'src/infrastructure/store/modules/customer_info/actions'
import { FETCH_CART } from 'src/infrastructure/store/modules/carts/actions'
import { RESET_CUSTOMER_INFO } from 'src/infrastructure/store/modules/customer_info/mutations'
import { RESET_CART } from 'src/infrastructure/store/modules/carts/mutations'
import { RESET_CUSTOMER, SET_CUSTOMER } from 'src/infrastructure/store/modules/auth/mutations'
import router from 'src/infrastructure/router'

export const SIGN_UP = 'auth/SIGN_UP'
export const SIGN_IN = 'auth/SIGN_IN'
export const SIGN_OUT = 'auth/SIGN_OUT'

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
      // true means force fetch
      dispatch(FETCH_CUSTOMER_INFO, true)
      dispatch(FETCH_CART, true)
    }
  },

  [SIGN_OUT]({ commit }) {
    localStorage.removeItem('customer')
    authApi.signOut()
    commit(RESET_CUSTOMER)

    // clear customer-realted data
    commit(RESET_CUSTOMER_INFO)
    commit(RESET_CART)

    // go home
    router.push({ name: 'home' })
  }
}

export default actions
