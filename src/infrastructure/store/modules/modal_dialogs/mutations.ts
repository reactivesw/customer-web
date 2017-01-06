import {
  SET_LOGIN
} from '../../modal_dialogs_types'

export default {
  [SET_LOGIN] (state, isShow) {
    state.showLogin = isShow
  }
}
