import { auth as authApi } from 'src/infrastructure/api_client'
import { FETCH_CUSTOMER_INFO } from 'src/infrastructure/store/modules/customer_info/actions'
import { FETCH_CART } from 'src/infrastructure/store/modules/carts/actions'
import { RESET_CUSTOMER_INFO } from 'src/infrastructure/store/modules/customer_info/mutations'
import { RESET_CART } from 'src/infrastructure/store/modules/carts/mutations'
import { RESET_CUSTOMER, SET_CUSTOMER } from 'src/infrastructure/store/modules/auth/mutations'
import router from 'src/infrastructure/router'
import { GoogleSignInRequest } from 'src/infrastructure/api_client/auth'
import {HIDE_LOG_IN, HIDE_SIGN_UP, SHOW_LOG_IN} from 'src/infrastructure/store/modules/modal_dialogs/actions'

export const SIGN_UP = 'auth/SIGN_UP'
export const LOG_IN = 'auth/LOG_IN'
export const SIGN_OUT = 'auth/SIGN_OUT'

const actions = {

  async [SIGN_UP]({ commit, dispatch }, { email, password }) {
    const customer = await authApi.signUp(email, password)

    if (customer) {
      dispatch(HIDE_SIGN_UP)
      dispatch(SHOW_LOG_IN)
    }
  },

  /**
   * Log in to backend, authInfo should be a object.
   *
   * @param {any} { commit }
   * @param {any} authInfo
   */
  async [LOG_IN]({ rootState, commit, dispatch }, authInfo) {
    let customer
    if (authInfo.type === 'email') {
      customer = await authApi.emailSignIn( authInfo.email, authInfo.pwd )

    } else if (authInfo.type === 'google') {
      const request: GoogleSignInRequest = {
        token: authInfo.id_token
      }
      customer = await authApi.googleSignIn( request )
      customer.name = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName()

    } else if (authInfo.type === 'facebook') {
      customer = await authApi.facebookSignIn( authInfo.response )

      // make facebook sdk callback method to promise
      customer.name = await new Promise( ( resolve, reject ) => {
        FB.api( '/me', ( response ) => {
          resolve( response.name )
        } )
      } )
    }

    if (customer) {
      dispatch(HIDE_LOG_IN)
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

    // should sign out google when user sign out our website, next time they might want to choose another google account.
    const gAuth = gapi.auth2.getAuthInstance()
    gAuth.signOut()

    // go home
    router.push({ name: 'home' })
  }
}

export default actions
