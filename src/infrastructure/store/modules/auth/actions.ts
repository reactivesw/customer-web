import { auth as authApi } from 'src/infrastructure/api_client'
import Cookies = require('js-cookie')
import { SIGN_IN, SET_CUSTOMER } from '../../auth_types'
import { HIDE_LOGIN, HIDE_SIGNUP } from '../../modal_dialogs_types'

export default {

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
    if (authInfo.type === 'google') {
      const customer = await authApi.googleSignIn(authInfo.id_token)

      if (customer) {
        dispatch(HIDE_LOGIN)
        dispatch(HIDE_SIGNUP)

        Cookies.set('customer', JSON.stringify(customer))
        commit(SET_CUSTOMER, customer)
      }
    }
  }

}
