import mutations from './mutations'
import actions from './actions'

const initialState = {
  showSignIn: false,
  showSignUp: false
}

export default {
  state: {...initialState},
  mutations,
  actions
}
