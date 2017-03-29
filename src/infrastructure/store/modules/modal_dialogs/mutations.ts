import {
  SET_SIGN_IN,
  SET_SIGN_UP
} from 'src/infrastructure/store/modal_dialogs_types'

const mutations = {
  [SET_SIGN_IN] (state, isShow) {
    state.showSignIn = isShow
  },

  [SET_SIGN_UP] (state, isShow) {
    state.showSignUp = isShow
  }
}

export default mutations
