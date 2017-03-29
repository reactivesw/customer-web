import { SET_CATEGORIES } from 'src/infrastructure/store/categories_types'

const mutations = {
  [SET_CATEGORIES] (state, categories) {
    state.categories = categories
  }
}

export default mutations
