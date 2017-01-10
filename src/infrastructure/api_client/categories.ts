import http from './http'
import * as endpoints from './endpoints'

/**
 * fetch all categories
 *
 * @export
 * @returns
 */
export async function getCategories() {
  const response = await http.get(endpoints.CATEGORIES)
  return response.data.results
}
