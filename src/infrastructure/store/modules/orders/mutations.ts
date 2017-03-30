import {
  SET_CURRENT_ORDER
} from 'src/infrastructure/store/orders_types'

const mutations = {
  [SET_CURRENT_ORDER](state, order) {
    state.currentOrder = order
  }
}

export default mutations
