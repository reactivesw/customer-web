import getters from './getters'
import mutations, { INITIAL_VALUE } from './mutations'
import actions from './actions'

function getCustomerInitialState () {
  let localCustomer = localStorage.getItem('customer')
  return localCustomer ? JSON.parse(localCustomer) : INITIAL_VALUE
}

const initialState = {
  customer: getCustomerInitialState()
}

export default {
  state: {...initialState},
  getters,
  mutations,
  actions
}
