import http from './http'
import tokenManager from './tokenManager'
import * as CARTS_ACTIONS from './carts_actions'
import Utils from './utils'

export interface AddLineItem {
  productId: string,
  variantId: number,
  quantity: number
}

export interface RemoveLineItem {
  lineItemId: string,
  quantity: number
}

export interface SetLineItemQuantity {
  lineItemId: string,
  quantity: number
}

const CARTS = '/carts'

/**
 * fetch cart by customerId or anonymousId(if not logged in)
 * @param {Object} object contain customerId or anonymousId
 */
export async function getCart () {
  return tokenManager.getToken()
  .then((token) => {
    const tokenPayload = Utils.decodeToken(token)

    // token might belong to anonymous customer or signed in customer
    let params
    if (tokenPayload.sub === 'anonymous') {
      params = {anonymousId: tokenPayload.subjectId}
    } else {
      params = {customerId: tokenPayload.subjectId}
    }

    return http.get(CARTS, {params})
  })
  .then((response) => {
    return response && response.data
  })
}

/**
 * send a addLineItem update action.
 * @export
 * @param {any} cart
 * @param {any} lineItem
 * @returns
 */
export async function addToCart (cartId: string, cartVersion: number, lineItem: AddLineItem) {
  if (typeof lineItem.quantity !== 'number' || lineItem.quantity < 1) {
    lineItem.quantity = 1
  }
  const addLineItemAction = Utils.buildAction(CARTS_ACTIONS.ADD_LINE_ITEM, lineItem)
  return Utils.makeUpdateRequest(`${CARTS}/${cartId}`, cartVersion, [addLineItemAction])
}

/**
 * send a removeLineItem update action.
 * @export
 * @param {any} cart
 * @param {any} lineItem
 * @returns
 */
export async function removeLineItem (cartId: string, cartVersion: number, lineItem: RemoveLineItem) {
  const removeLineItemAction = Utils.buildAction(CARTS_ACTIONS.REMOVE_LINE_ITEM, lineItem)
  return Utils.makeUpdateRequest(`${CARTS}/${cartId}`, cartVersion, [removeLineItemAction])
}

/**
 * change lineitem quantity in cart.
 * @export
 * @param {any} cart
 * @param {any} lineItem
 * @returns
 */
export async function changeLineItemQuantity (cartId: string, cartVersion: number, lineItem: SetLineItemQuantity) {
  const changeLineItemQuantityAction = Utils.buildAction(CARTS_ACTIONS.SET_LINE_ITEM_QUANTITY, lineItem)
  return Utils.makeUpdateRequest(`${CARTS}/${cartId}`, cartVersion, [changeLineItemQuantityAction])
}
