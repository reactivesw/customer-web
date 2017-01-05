import axios from 'axios'
import * as endpoints from './endpoints'
import * as CARTS_ACTIONS from './carts_actions'

// Create a http client instance with some common settings
const instance = axios.create({
  baseURL: process.env.RS_API_URL,
  timeout: 1000
})

/**
 * fetch cart by customerId or anonymousId(if not logged in)
 *
 * @export
 * @param {Object} - object contain customerId or anonymousId
 * @returns
 */
export async function getCart({ customerId, anonymousId }: any) {
  const params = {}
  if (customerId) {
    params['customerId'] = customerId
  } else if (anonymousId) {
    params['anonymousId'] = anonymousId
  } else {
    return
  }
  const response = await instance.get(endpoints.CARTS, { params })
  return response.data
}

/**
 * send a addLineItem update request,
 *
 * @export
 * @param {any} { cartId, lineitemDraft, version }
 * @returns
 */
export async function addToCart({ cartId, lineitemDraft, cartVersion }) {
  const addLineItemAction = buildAddLineItemAction(lineitemDraft)
  const updateRequest = JSON.stringify({
    actions: [ addLineItemAction ],
    version: cartVersion
  })
  const params = {
    cartId,
    updateRequest
  }
  const response = await instance.put(endpoints.CARTS, params)
  return response.data
}

/**
 * fetch product by product slug
 *
 * @export
 * @param {string} productSlug
 */
export async function getProduct(productSlug: string) {
  const response = await instance.get(endpoints.PRODUCTS, {
    params: {
      slug: productSlug
    }
  })
  return response.data
}

/**
 * fetch product type by product type id
 *
 * @export
 * @param {string} productTypeId
 * @returns
 */
export async function getProductType(productTypeId: string) {
  const response = await instance.get(`${endpoints.PRODUCT_TYPES}/${productTypeId}`)
  return response.data
}


/**
 * fetch product projections of current category (determined by route) by category slug
 *
 * @export
 * @param {string} categorySlug
 * @returns
 */
export async function getProductProjections(categorySlug: string) {
  const params = {
    where: `slug:${categorySlug}`
  }
  return await getApiResult(endpoints.PRODUCT_PROJECTION, { params })
}

/**
 * fetch all categories
 *
 * @export
 * @returns
 */
export async function getCategories() {
  return await getApiResult(endpoints.CATEGORIES)
}

async function getApiResult(url: string, params?) {
  const response = await instance.get(url, params)
  return response.data.results
}

function buildAddLineItemAction(options) {
  return {
    action: CARTS_ACTIONS.ADD_LINE_ITEM,
    productId: options.productId,
    variantId: options.variantId,
    quantity: options.quantity
  }
}
