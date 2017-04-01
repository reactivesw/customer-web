import { orders as ordersApi } from 'src/infrastructure/api_client'
import { PLACE_ORDER, SET_CURRENT_ORDER } from 'src/infrastructure/store/orders_types'
import { FETCH_CART } from 'src/infrastructure/store/carts_types'
import { PlaceOrderRequest } from 'src/infrastructure/api_client/orders'

export interface PlaceOrder {
  addressId: string,
  creditCartId: string
}

const actions = {

  /**
   * checkout current active cart
   */
  async [PLACE_ORDER] ( { rootState, commit, dispatch }, payload: PlaceOrder ) {
    const placeOrderRequest: PlaceOrderRequest = {
      customerId: rootState.auth.customer.id,
      addressId: payload.addressId,
      creditCartId: payload.creditCartId,
      cartId: rootState.carts.cart.id
    }

    const order = await ordersApi.placeOrder(placeOrderRequest)

    // previous cart has turn into a order, we'll set it shipping and payment info.
    commit( SET_CURRENT_ORDER, order )

    // previous cart has been consumed, fetch the new empty cart for customer now.
    dispatch( FETCH_CART )
  }
}

export default actions
