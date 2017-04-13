import {
  SHOW_LOG_IN,
  HIDE_LOG_IN,
  SET_LOG_IN,
  SHOW_SIGN_UP,
  HIDE_SIGN_UP,
  SET_SIGN_UP } from 'src/infrastructure/store/modal_dialogs_types'

const actions = {
  [SHOW_LOG_IN]({ state, commit }) {
    commit(SET_LOG_IN, true)
  },

  [HIDE_LOG_IN]({ state, commit }) {
    commit(SET_LOG_IN, false)
  },

  [SHOW_SIGN_UP]({ state, commit }, ) {
    commit(SET_SIGN_UP, true)
  },

  [HIDE_SIGN_UP]({ state, commit }) {
    commit(SET_SIGN_UP, false)
  }
}

export default actions
