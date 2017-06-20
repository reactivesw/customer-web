import http from './http'

const PRODUCTS = '/products'
const PRODUCT_TYPES = '/product-types'
const CATEGORY_PRODUCT_VIEW_API_URL = PRODUCTS + '/CategoryProducts'
const DETAIL_PRODUCT_VIEW_API_URL = PRODUCTS + '/DetailProducts'
const SEARCH_URL = PRODUCTS + '/search'

/**
 * fetch product by product slug
 *
 * @export
 * @param {string} productSlug
 */
export async function getProduct(sku: string) {
  const response = await http.get(`${DETAIL_PRODUCT_VIEW_API_URL}/${sku}`)
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
 * fetch product projections of current category (determined by route) by category id
 *
 * @export
 * @param {string} categoryId
 * @returns
 */
export async function getProductProjections(categoryId: string) {
  const params = {
    categoryId: `${categoryId}`
  }
  const response = await http.get(CATEGORY_PRODUCT_VIEW_API_URL, { params })
  return response && response.data.results
}

/**
 * Search products
 * @param searchKey
 * @returns {Promise<AxiosPromise|(()=>NestedResults)|(()=>any)|IConfigurationFile|{[p: string]: {errorsFromLinter: LintError[], errorsFromMarkup: LintError[], fixesFromLinter: string, fixesFromMarkup: string, markupFromLinter: string, markupFromMarkup: string}}>}
 */
export async function search(searchKey: string) {
  const params = {
    searchWords: searchKey
  }
  const response = await http.get(SEARCH_URL, { params })
  return response && response.data.results
}
