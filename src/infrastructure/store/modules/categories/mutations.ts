import { SET_CATEGORIES } from 'src/infrastructure/store/categories_types'

export default {
  [SET_CATEGORIES] (state, categories) {
    state.categories = categories
  }
}
