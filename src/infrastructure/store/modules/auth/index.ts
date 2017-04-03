import getters from './getters'
import mutations from './mutations'
import actions from './actions'

function setInitialState() {
  let localCustomer = localStorage.getItem('customer')
  return localCustomer ? JSON.parse(localCustomer) : undefined
}

const initialState = {
  customer: setInitialState()
}

export default {
  state: {...initialState},
  getters,
  mutations,
  actions
}
