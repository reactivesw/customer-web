import { categories as categoriesApi } from 'src/infrastructure/api_client'
import { FETCH_CATEGORIES, SET_CATEGORIES } from '../../categories_types'

// categoriesPromise is for prevent duplicate request and cache.
let categoriesPromise
export default {
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
