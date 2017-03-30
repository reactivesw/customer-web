import http from './http'

const ORDER_API_URL = '/orders'

export default class OrderApi {
  static async checkout ( cartId: string ) {
    const response = await http.post(`${ORDER_API_URL}/checkout`, null, {
      params: { cartId }
    })
    .then(( response ) => {
      return response && response.data
    })

    return response
  }
}
