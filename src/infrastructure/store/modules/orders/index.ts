import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const initialState = {
  orders: null,
  currentOrder: null
}

export default {
  state: {...initialState},
  getters,
  mutations,
  actions
}
