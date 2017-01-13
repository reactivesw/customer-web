import { auth as authApi } from 'src/infrastructure/api_client'
import Cookies = require('js-cookie')
import { SIGN_IN, SET_CUSTOMER } from '../../auth_types'

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
  async [SIGN_IN]({ commit }, authInfo) {
    if (authInfo.type === 'google') {
      const customer = await authApi.googleSignIn(authInfo.id_token)
      Cookies.set('customer', JSON.stringify(customer))
      commit(SET_CUSTOMER, customer)
    }
  }

}
