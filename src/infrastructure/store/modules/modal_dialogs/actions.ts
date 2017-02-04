import {
  SHOW_SIGN_IN,
  HIDE_SIGN_IN,
  SET_SIGN_IN,
  SHOW_SIGN_UP,
  HIDE_SIGN_UP,
  SET_SIGN_UP } from '../../modal_dialogs_types'

export default {
  [SHOW_SIGN_IN]({ state, commit }) {
    commit(SET_SIGN_IN, true)
  },

  [HIDE_SIGN_IN]({ state, commit }) {
    commit(SET_SIGN_IN, false)
  },

  [SHOW_SIGN_UP]({ state, commit }, ) {
    commit(SET_SIGN_UP, true)
  },

  [HIDE_SIGN_UP]({ state, commit }) {
    commit(SET_SIGN_UP, false)
  }
}
