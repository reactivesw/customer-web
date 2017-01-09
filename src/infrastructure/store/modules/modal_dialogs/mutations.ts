import {
  SET_LOGIN,
  SET_SIGNUP
} from '../../modal_dialogs_types'

export default {
  [SET_LOGIN] (state, isShow) {
    state.showLogin = isShow
  },

  [SET_SIGNUP] (state, isShow) {
    state.showSignup = isShow
  }
}
