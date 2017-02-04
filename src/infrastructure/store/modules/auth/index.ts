import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const initialState = {
  customer: JSON.parse(localStorage.getItem('customer') || '{}')
}

export default {
  state: {...initialState},
  getters,
  mutations,
  actions
}
