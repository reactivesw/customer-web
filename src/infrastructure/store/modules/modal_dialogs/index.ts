import mutations from './mutations'
import actions from './actions'

const initialState = {
  showLogin: false,
  showSignup: false
}

export default {
  state: {...initialState},
  mutations,
  actions
}
