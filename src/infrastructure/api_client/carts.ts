import http from './http'
import tokenManager from './tokenManager'
import Utils from './utils'

export const ADD_LINE_ITEM = 'addLineItem'
export const SET_LINE_ITEM_QUANTITY = 'setLineItemQuantity'
export const REMOVE_LINE_ITEM = 'removeLineItem'

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
export async function getCart() {
  const payload = await tokenManager.getPayload()
  let params
  if (payload.sub === 'anonymous') {
    params = { anonymousId: payload.subjectId }
  } else {
    params = { customerId: payload.subjectId }
    if (payload.anonymousId) {
      params.anonymousId = payload.anonymousId
    }
  }
  const response = await http.get(CARTS, { params })
  return response && response.data
}

/**
 * send a addLineItem update action.
 * @export
 * @param {any} cart
 * @param {any} lineItem
 * @returns
 */
export async function addToCart(cartId: string, cartVersion: number, lineItem: AddLineItem) {
  if (typeof lineItem.quantity !== 'number' || lineItem.quantity < 1) {
    lineItem.quantity = 1
  }
  const addLineItemAction = Utils.buildAction(ADD_LINE_ITEM, lineItem)
  return Utils.makeUpdateRequest(`${CARTS}/${cartId}`, cartVersion, [addLineItemAction])
}

/**
 * send a removeLineItem update action.
 * @export
 * @param {any} cart
 * @param {any} lineItem
 * @returns
 */
export async function removeLineItem(cartId: string, cartVersion: number, lineItem: RemoveLineItem) {
  const removeLineItemAction = Utils.buildAction(REMOVE_LINE_ITEM, lineItem)
  return Utils.makeUpdateRequest(`${CARTS}/${cartId}`, cartVersion, [removeLineItemAction])
}

/**
 * change lineitem quantity in cart.
 * @export
 * @param {any} cart
 * @param {any} lineItem
 * @returns
 */
export async function changeLineItemQuantity(cartId: string, cartVersion: number, lineItem: SetLineItemQuantity) {
  const changeLineItemQuantityAction = Utils.buildAction(SET_LINE_ITEM_QUANTITY, lineItem)
  return Utils.makeUpdateRequest(`${CARTS}/${cartId}`, cartVersion, [changeLineItemQuantityAction])
}
