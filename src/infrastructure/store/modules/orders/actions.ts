import { orders as ordersApi } from 'src/infrastructure/api_client'
import {
  CHECKOUT,
  SET_CURRENT_ORDER
} from 'src/infrastructure/store/orders_types'
import { FETCH_CART } from 'src/infrastructure/store/carts_types'

const actions = {
  async [CHECKOUT] ( { rootState, commit, dispatch } ) {
    const order = await ordersApi.checkout( rootState.carts.cart.id )

    // previous cart has turn into a order, we'll set it shipping and payment info.
    commit( SET_CURRENT_ORDER, order )

    // previous cart has been consumed, fetch the new empty cart for customer now.
    dispatch( FETCH_CART )
  }
}

export default actions

