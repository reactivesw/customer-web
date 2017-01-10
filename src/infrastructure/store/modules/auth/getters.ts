import { GET_CUSTOMER } from '../../auth_types'

export default {
  [GET_CUSTOMER](state) {
    return state.customer
  }
}
