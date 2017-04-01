import http from './http'

const ORDER_API_URL = '/orders'

export interface PlaceOrderRequest {
  customerId: string,
  addressId: string,
  creditCartId: string,
  cartId: string
}

/**
 * take customerId, addressId, creditCardId and cartId to place a order.
 * @param request
 * @returns {Promise<JQueryXHR|AxiosPromise|any>}
 */
export async function placeOrder ( request: PlaceOrderRequest ) {
  // second param represents request body
  const response = await http.post(`${ORDER_API_URL}`, request)
  return response && response.data
}
