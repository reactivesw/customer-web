// Declare process to make tsc happy
declare const process: any
import axios from 'axios'
import * as endpoints from './endpoints'

// Create a http client instance with some common settings
const instance = axios.create({
  baseURL: process.env.RS_API_URL,
  timeout: 1000
})

/**
 * fetch product by product slug
 *
 * @export
 * @param {string} productSlug
 */
export async function getProduct(productSlug: string) {
  const response = await instance.get(`${endpoints.PRODUCTS}/${productSlug}`)
  return response.data
}

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
