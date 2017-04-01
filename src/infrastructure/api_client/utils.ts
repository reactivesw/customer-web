// jwt-decode is just a simple function, but it's provided by auth0, the group which crafted jwt.
import jwtDecoder from 'jwt-decode'
import http from './http'

export default class Utils {

  /**
   * decode the customer jwt token server returned
   * @param token our server return jwt token
   */
  static decodeToken(token: string) {
    return jwtDecoder(token)
  }

  /**
   * build action object for update usage
   * every update request is the same structure
   * @param actionType - like addLineItem
   * @param fields - { productId: xxx, variantId: xxx, quantity: xxx }
   */
  static buildAction(actionType, fields) {
    return {
      action: actionType,
      ...fields
    }
  }

  /**
   * make the update request.
   * every update request is the same structure
   * @param apiUrl the update api url
   * @param version current version of data, prevent replay attack and keep data sync
   * @param actions a array of update actions
   */
  static async makeUpdateRequest(apiUrl: string, version: Number, actions: Array<Object>) {
    const updateRequest = {
      actions,
      version
    }
    const response = await http.put(apiUrl, updateRequest)
    return response && response.data
  }
}
