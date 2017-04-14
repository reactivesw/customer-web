import http from '../http'

const ORDER_API_URL = '/orders'

export interface FetchOrderListByCustomerIdRequest {
  customerId: string
}

/**
 * fetch orders of a customer.
 * @param {FetchOrderListByCustomerIdRequest} request
 * @returns {Promise<any>}
 */
export async function fetchOrderListByCustomerId (request: FetchOrderListByCustomerIdRequest) {
  const response = await http.get(ORDER_API_URL, {
    params: request
  })
  return response && response.data
}

export interface PlaceOrderRequest {
  customerId: string,
  addressId: string,
  creditCardId: string,
  cartId: string
}

/**
 * take customerId, addressId, creditCardId and cartId to place a order.
 * @param {PlaceOrderRequest} request
 * @returns {Promise<any>}
 */
export async function placeOrder ( request: PlaceOrderRequest ) {
  // second param represents request body
  const response = await http.post(ORDER_API_URL, request)
  return response && response.data
}
