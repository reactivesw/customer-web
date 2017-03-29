import http from './http'
import tokenManager from './tokenManager'
import * as CARTS_ACTIONS from './carts_actions'

const CARTS = '/carts'

/**
 * fetch cart by customerId or anonymousId(if not logged in)
 *
 * @export
 * @param {Object} - object contain customerId or anonymousId
 * @returns
 */
export async function getCart() {
  tokenManager.getToken()
  .then(( token ) => {
    const params = {
      customerId: token
    }
    return http.get(CARTS, { params })
  })
  .then(( response ) => {
    return response && response.data
  })
}

/**
 * send a addLineItem update action.
 *
 * @export
 * @param {any} cartId
 * @param {any} cartVersion
 * @param {any} options
 * @returns
 */
export async function addToCart(cartId, cartVersion, options) {
  const addLineItemAction = buildAction(CARTS_ACTIONS.ADD_LINE_ITEM, options)
  return updateCart(cartId, cartVersion, [addLineItemAction])
}

/**
 * send a removeLineItem update action.
 *
 * @export
 * @param {any} cartId
 * @param {any} cartVersion
 * @param {any} options
 * @returns
 */
export async function removeLineItem(cartId, cartVersion, options) {
  const removeLineItemAction = buildAction(CARTS_ACTIONS.REMOVE_LINE_ITEM, options)
  return updateCart(cartId, cartVersion, [removeLineItemAction])
}

/**
 * change lineitem quantity in cart.
 *
 * @export
 * @param {any} cartId
 * @param {any} cartVersion
 * @param {any} options
 * @returns
 */
export async function changeLineItemQuantity(cartId, cartVersion, options) {
  const changeLineItemQuantityAction = buildAction(CARTS_ACTIONS.SET_LINE_ITEM_QUANTITY, options)
  return updateCart(cartId, cartVersion, [changeLineItemQuantityAction])
}

function buildAction(actionType, options) {
  return {
    action: actionType,
    ...options
  }
}

async function updateCart(cartId, version, actions) {
  const updateRequest = {
    actions,
    version
  }
  const response = await http.put(`${CARTS}/${cartId}`, updateRequest)
  return response && response.data
}
