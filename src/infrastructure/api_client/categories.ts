import http from './http'
import Utils from './utils'

export const CATEGORIES = '/categories'

/**
 * fetch all categories
 *
 * @export
 * @returns
 */
export async function getCategories() {
  // Make sure only one fetching request in the same time.
  return await Utils.singleRequest('fetchCategories', () => {
    return http.get(CATEGORIES).then(res => res.data.results)
  })
}
