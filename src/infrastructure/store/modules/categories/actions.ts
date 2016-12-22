import { getCategories } from 'src/infrastructure/api_client'
import { FETCH_CATEGORIES, SET_CATEGORIES } from '../../categories_types'

export default {
  async [FETCH_CATEGORIES] ({ commit }) {
    const categories = await getCategories()
    commit(SET_CATEGORIES, categories)
  }
}
