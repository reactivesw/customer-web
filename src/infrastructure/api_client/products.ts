import http from './http'
import * as endpoints from './endpoints'

/**
 * fetch product by product slug
 *
 * @export
 * @param {string} productSlug
 */
export async function getProduct(productSlug: string) {
  const response = await http.get(endpoints.PRODUCTS, {
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
  const response = await http.get(`${endpoints.PRODUCT_TYPES}/${productTypeId}`)
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
  const response = await http.get(endpoints.PRODUCT_PROJECTION, { params })
  return response.data.results
}
