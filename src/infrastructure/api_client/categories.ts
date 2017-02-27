import http from './http'

export const CATEGORIES = '/categories'

/**
 * fetch all categories
 *
 * @export
 * @returns
 */
export async function getCategories() {
  const response = await http.get(CATEGORIES)
  return response && response.data.results
}
