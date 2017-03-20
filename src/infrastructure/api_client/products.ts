import http from './http'

const PRODUCTS = '/products'
const PRODUCT_TYPES = '/product-types'
const PRODUCT_PROJECTION = '/products/projections'

/**
 * fetch product by product slug
 *
 * @export
 * @param {string} productSlug
 */
export async function getProduct(productSlug: string) {
  const response = await http.get(PRODUCTS, {
    params: {
      slug: productSlug
    }
  })
  return response && response.data
}

/**
 * fetch product type by product type id
 *
 * @export
 * @param {string} productTypeId
 * @returns
 */
export async function getProductType(productTypeId: string) {
  const response = await http.get(`${PRODUCT_TYPES}/${productTypeId}`)
  return response && response.data
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
  const response = await http.get(PRODUCT_PROJECTION, { params })
  return response && response.data.results
}
