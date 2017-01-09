import {
  SHOW_LOGIN,
  HIDE_LOGIN,
  SET_LOGIN,
  SHOW_SIGNUP,
  HIDE_SIGNUP,
  SET_SIGNUP } from '../../modal_dialogs_types'

export default {
  [SHOW_LOGIN]({ state, commit }) {
    commit(SET_LOGIN, true)
  },

  [HIDE_LOGIN]({ state, commit }) {
    commit(SET_LOGIN, false)
  },

  [SHOW_SIGNUP]({ state, commit }, ) {
    commit(SET_SIGNUP, true)
  },

  [HIDE_SIGNUP]({ state, commit }) {
    commit(SET_SIGNUP, false)
  }
}
