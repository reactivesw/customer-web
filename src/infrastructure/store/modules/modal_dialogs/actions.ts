import {
  SHOW_LOGIN,
  HIDE_LOGIN,
  SET_LOGIN } from '../../modal_dialogs_types'

export default {
  [SHOW_LOGIN]({ state, commit }) {
    commit(SET_LOGIN, true)
  },

  [HIDE_LOGIN]({ state, commit }) {
    commit(SET_LOGIN, false)
  }
}
