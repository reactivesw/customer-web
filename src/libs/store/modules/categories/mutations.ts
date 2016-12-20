import { SET_CATEGORIES } from '../../categories-types'

export default {
  [SET_CATEGORIES] (state, categories) {
    state.categories = categories
  }
}
