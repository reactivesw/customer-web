import { auth as authApi } from 'src/infrastructure/api_client'
import { FETCH_CUSTOMER_INFO } from 'src/infrastructure/store/modules/customer_info/actions'
import { FETCH_CART } from 'src/infrastructure/store/modules/carts/actions'
import { RESET_CUSTOMER_INFO } from 'src/infrastructure/store/modules/customer_info/mutations'
import { RESET_CUSTOMER, SET_CUSTOMER } from 'src/infrastructure/store/modules/auth/mutations'
import router from 'src/infrastructure/router'
import { GoogleLoginRequest } from 'src/infrastructure/api_client/auth'
import { HIDE_LOGIN, HIDE_SIGN_UP, SHOW_LOGIN } from 'src/infrastructure/store/modules/modal_dialogs/actions'
import { RESET_PAYMENTS } from 'src/infrastructure/store/modules/payment_info/mutations'
import { RESET_ORDERS } from 'src/infrastructure/store/modules/orders/mutations'
import { RESET_CART } from 'src/infrastructure/store/modules/carts/mutations'

export const SIGN_UP = 'auth/SIGN_UP'
export const LOGIN = 'auth/LOGIN'
export const LOGOUT = 'auth/LOGOUT'
export const UPDATE_PASSWORD = 'auth/UPDATE_PASSWORD'

const actions = {

  async [SIGN_UP]({ commit, dispatch }, { email, password }) {
    const customer = await authApi.signUp(email, password)

    if (customer) {
      dispatch(HIDE_SIGN_UP)
      dispatch(SHOW_LOGIN)
    }
  },

  /**
   * Log in to backend, authInfo should be a object.
   *
   * @param {any} { commit }
   * @param {any} authInfo
   */
  async [LOGIN]({ rootState, commit, dispatch }, authInfo) {
    let customer
    if (authInfo.type === 'email') {
      customer = await authApi.emailLogin(authInfo.email, authInfo.pwd)

    } else if (authInfo.type === 'google') {
      const request: GoogleLoginRequest = {
        token: authInfo.id_token
      }
      customer = await authApi.googleLogin(request)
      customer.name = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName()

    } else if (authInfo.type === 'facebook') {
      customer = await authApi.facebookLogin(authInfo.response)

      // make facebook sdk callback method to promise
      customer.name = await new Promise((resolve, reject) => {
        FB.api('/me', (response) => {
          resolve(response.name)
        })
      })
    }

    if (customer) {
      dispatch(HIDE_LOGIN)
      dispatch(HIDE_SIGN_UP)

      localStorage.setItem('customer', JSON.stringify(customer))
      commit(SET_CUSTOMER, customer)

      // get customer-related info and cart data
      // true means force fetch
      dispatch(FETCH_CUSTOMER_INFO, true)
      dispatch(FETCH_CART, true)

      return customer
    }
  },

  [LOGOUT]({ commit, dispatch }) {
    localStorage.removeItem('customer')
    authApi.logout()

    // clear customer-realted data
    commit(RESET_CUSTOMER)
    commit(RESET_CUSTOMER_INFO)
    commit(RESET_PAYMENTS)
    commit(RESET_ORDERS)
    commit(RESET_CART)

    dispatch(FETCH_CART, true) // fetch a new cart for anonymous instead of reset to undefined.

    // go home
    router.push({ name: 'home' })
  },

  async [UPDATE_PASSWORD]({ commit, dispatch }, request) {
    const customer = await authApi.updatePassword(request)

    localStorage.setItem('customer', JSON.stringify(customer))
    commit(SET_CUSTOMER, customer)

    return customer
  }
}

export default actions
