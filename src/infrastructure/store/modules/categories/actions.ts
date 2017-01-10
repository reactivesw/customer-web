import { categories as categoriesApi } from 'src/infrastructure/api_client'
import { FETCH_CATEGORIES, SET_CATEGORIES } from '../../categories_types'

let categories = null
export default {
  async[FETCH_CATEGORIES]({ commit }) {
    if (categories === null) {
      categories = await categoriesApi.getCategories()
    }
    commit(SET_CATEGORIES, categories)
  }
}
