import { categories as categoriesApi } from 'src/infrastructure/api_client'
import { SET_CATEGORIES } from 'src/infrastructure/store/modules/categories/mutations'

export const FETCH_CATEGORIES = 'categories/FETCH_CATEGORIES'

// categoriesPromise is for prevent duplicate request and cache.
let categoriesPromise
const actions = {
  async[FETCH_CATEGORIES]({ commit }) {
    if (!categoriesPromise) {
      categoriesPromise = categoriesApi.getCategories()
      .then((categories) => {
        commit(SET_CATEGORIES, categories)
        return categories
      })
    }
    return await categoriesPromise
  }
}

export default actions
