import { SET_CUSTOMER } from '../../auth_types'

export default {
  [SET_CUSTOMER](state, customer) {
    state.customer = customer
  }
}
