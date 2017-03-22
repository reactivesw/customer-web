import { customerInfo } from 'src/infrastructure/api_client'
import { FETCH_CUSTOMER_INFO, SET_CUSTOMER_INFO } from '../../customer_info_types'


export default {
  async[FETCH_CUSTOMER_INFO]({ rootState, commit }) {
    const id = rootState.auth.customer.id
    const info = await customerInfo.getCustomerInfo(id)
    commit(SET_CUSTOMER_INFO, info)
  }
}


