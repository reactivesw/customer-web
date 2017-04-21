export const SET_LOGIN = 'modal_dialogs/SET_LOGIN'
export const SET_SIGNUP = 'modal_dialogs/SET_SIGNUP'

const mutations = {
  [SET_LOGIN](state, isShow) {
    state.showLogin = isShow
  },

  [SET_SIGNUP](state, isShow) {
    state.showSignUp = isShow
  }
}

export default mutations
