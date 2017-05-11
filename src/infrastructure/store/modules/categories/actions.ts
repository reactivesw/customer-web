import { categories as categoriesApi } from 'src/infrastructure/api_client'
import { SET_CATEGORIES } from 'src/infrastructure/store/modules/categories/mutations'
import { GET_CATEGORIES } from 'src/infrastructure/store/modules/categories/getters'

export const FETCH_CATEGORIES = 'categories/FETCH_CATEGORIES'

const actions = {

  /**
   * Fetch categories
   * Only fetch once unless refresh browser
   * If categories is fetched, simply return it. (like a async getter)
   * @param commit
   * @param getters
   * @returns {Promise<any>}
   */
  async[FETCH_CATEGORIES]({ commit, getters }) {
    let categories = getters[GET_CATEGORIES]
    if (categories.length === 0) {
      categories = await categoriesApi.getCategories()
      .then((categories) => {
        commit(SET_CATEGORIES, categories)
        return categories
      })
    }
    return categories
  }
}

export default actions
