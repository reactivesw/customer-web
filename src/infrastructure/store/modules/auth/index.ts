import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import Cookies = require('js-cookie')

const initialState = {
  customer: JSON.parse(Cookies.get('customer')) || {}
}

export default {
  state: {...initialState},
  getters,
  mutations,
  actions
}
