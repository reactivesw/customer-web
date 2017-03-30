import { GET_CURRENT_ORDER } from 'src/infrastructure/store/orders_types'

const getters = {
  [GET_CURRENT_ORDER]( state ) {
    return state.currentOrder
  }
}

export default getters
