import {SET_LOG_IN, SET_SIGN_UP} from 'src/infrastructure/store/modules/modal_dialogs/mutations'
export const SHOW_LOG_IN = 'modal_dialogs/SHOW_LOG_IN'
export const HIDE_LOG_IN = 'modal_dialogs/HIDE_LOG_IN'
export const SHOW_SIGN_UP = 'modal_dialogs/SHOW_SIGN_UP'
export const HIDE_SIGN_UP = 'modal_dialogs/HIDE_SIGN_UP'

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
