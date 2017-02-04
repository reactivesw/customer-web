import {
  SET_SIGN_IN,
  SET_SIGN_UP
} from '../../modal_dialogs_types'

export default {
  [SET_SIGN_IN] (state, isShow) {
    state.showSignIn = isShow
  },

  [SET_SIGN_UP] (state, isShow) {
    state.showSignUp = isShow
  }
}
