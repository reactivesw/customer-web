export const SET_LOG_IN = 'modal_dialogs/SET_LOG_IN'
export const SET_SIGN_UP = 'modal_dialogs/SET_SIGN_UP'

const mutations = {
  [SET_LOG_IN] (state, isShow) {
    state.showLogin = isShow
  },

  [SET_SIGN_UP] (state, isShow) {
    state.showSignUp = isShow
  }
}

export default mutations
