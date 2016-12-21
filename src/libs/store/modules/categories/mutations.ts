import { SET_CATEGORIES } from '../../categories_types'

export default {
  [SET_CATEGORIES] (state, categories) {
    state.categories = categories
  }
}
