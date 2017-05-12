// jwt-decode is just a simple function, but it's provided by auth0, the group which crafted jwt.
import jwtDecoder from 'jwt-decode'
import http from './http'

const promiseTable: Object = {}

export default {

  /**
   * decode the customer jwt token server returned
   * @param token our server return jwt token
   */
  decodeToken(token: string) {
    return jwtDecoder(token)
  },

  /**
   * build action object for update usage
   * every update request is the same structure
   * @param actionType - like addLineItem
   * @param fields - { productId: xxx, variantId: xxx, quantity: xxx }
   */
   buildAction(actionType, fields) {
    return {
      action: actionType,
      ...fields
    }
  },

  /**
   * make the update request.
   * every update request is the same structure
   * @param apiUrl the update api url
   * @param version current version of data, prevent replay attack and keep data sync
   * @param actions a array of update actions
   */
   async makeUpdateRequest(apiUrl: string, version: Number, actions: Array<Object>) {
    const updateRequest = {
      actions,
      version
    }
    const response = await http.put(apiUrl, updateRequest)
    return response && response.data
  },

  /**
   * Helper to make sure only one request with specific id is fetching.
   * If there is already a request with the id, second parameter is not going to execute, response of previous promise
   * return instead.
   * @param id - only one request with this id is allowed
   * @param sendRequestFunc - A promise, or a function return promise
   * @returns {any}
   */
  async singleRequest(id: string, sendRequestFunc) {
    if (!promiseTable.hasOwnProperty(id)) {
      promiseTable[id] = sendRequestFunc()
    }
    try {
      const res = await promiseTable[id]
      return res
    } finally {
      // request might fail, always delete the promise
      delete promiseTable[id]
    }
  }
}
