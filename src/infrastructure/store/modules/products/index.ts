import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const initialState = {
  currentCategoryProducts: [],
  currentProduct: undefined,
  currentProductType: undefined
}

export default {
  state: {...initialState},
  getters,
  mutations,
  actions
}
