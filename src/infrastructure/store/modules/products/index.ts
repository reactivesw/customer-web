import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const initialState = {
  currentCategoryProducts: []
}

export default {
  state: {...initialState},
  getters,
  mutations,
  actions
}
