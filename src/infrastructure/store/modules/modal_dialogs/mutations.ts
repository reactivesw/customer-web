import {
  SET_LOG_IN,
  SET_SIGN_UP
} from 'src/infrastructure/store/modal_dialogs_types'

const mutations = {
  [SET_LOG_IN] (state, isShow) {
    state.showLogin = isShow
  },

  [SET_SIGN_UP] (state, isShow) {
    state.showSignUp = isShow
  }
}

export default mutations
