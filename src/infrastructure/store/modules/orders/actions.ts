import {orders as ordersApi} from 'src/infrastructure/api_client'
import {
  FETCH_CART
} from 'src/infrastructure/store/modules/carts/actions'
import {FetchOrderListByCustomerIdRequest, PlaceOrderRequest} from 'src/infrastructure/api_client/customer/orders'
import {SET_CURRENT_ORDER, SET_ORDERS} from 'src/infrastructure/store/modules/orders/mutations'

export const FETCH_ORDERS = 'orders/FETCH_ORDERS'
export const PLACE_ORDER = 'orders/PLACE_ORDER'

const actions = {

  async [FETCH_ORDERS] ({state, commit}, payload: FetchOrderListByCustomerIdRequest) {
    const orders = await ordersApi.fetchOrderListByCustomerId(payload)
    commit(SET_ORDERS, orders)
  },

  /**
   * checkout current active cart
   */
  async [PLACE_ORDER] ({rootState, commit, dispatch}, payload: PlaceOrderRequest) {
    try {
      const order = await ordersApi.placeOrder(payload)

      // previous cart has turn into a order.
      commit(SET_CURRENT_ORDER, order)

      // previous cart has been consumed, fetch the new empty cart for customer now.
      dispatch(FETCH_CART, true)

      return order

    } catch (e) {
      // it's possible place order failed but cart been consumed, so always fetch it.
      dispatch(FETCH_CART, true)
      throw e
    }
  }
}

export default actions
