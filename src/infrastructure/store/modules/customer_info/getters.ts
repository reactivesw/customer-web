import { GET_CUSTOMER_INFO } from 'src/infrastructure/store/customer_info_types'

const getters = {
  [GET_CUSTOMER_INFO](state) {
    return state.customerInfo
  }
}

export default getters
