import {SET_LOGIN, SET_SIGNUP} from 'src/infrastructure/store/modules/modal_dialogs/mutations'
export const SHOW_LOGIN = 'modal_dialogs/SHOW_LOGIN'
export const HIDE_LOGIN = 'modal_dialogs/HIDE_LOGIN'
export const SHOW_SIGN_UP = 'modal_dialogs/SHOW_SIGN_UP'
export const HIDE_SIGN_UP = 'modal_dialogs/HIDE_SIGN_UP'

const actions = {
  [SHOW_LOGIN]({ state, commit }) {
    commit(SET_LOGIN, true)
  },

  [HIDE_LOGIN]({ state, commit }) {
    commit(SET_LOGIN, false)
  },

  [SHOW_SIGN_UP]({ state, commit }, ) {
    commit(SET_SIGNUP, true)
  },

  [HIDE_SIGN_UP]({ state, commit }) {
    commit(SET_SIGNUP, false)
  }
}

export default actions
