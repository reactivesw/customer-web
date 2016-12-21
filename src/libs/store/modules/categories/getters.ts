import { GET_CATEGORIES, GET_FEATURE_CATEGORY } from '../../categories_types'

export default {
  [GET_CATEGORIES] (state) {
    return state.categories
  },

  // category with the smallest orderHint is the feature category, invalid orderHint will be treated as POSITIVE_INFINITY.
  [GET_FEATURE_CATEGORY] (state) {
    return state.categories[0]
  }
}
