export const GET_CATEGORIES = 'categories/GET_CATEGORIES'
// feature category is the category show first when user visit. currently we use the orderhint to determine it.
export const GET_FEATURE_CATEGORY = 'categories/GET_FEATURE_CATEGORY'
export const GET_CURRENT_PRODUCTS_LIST = 'categories/GET_CURRENT_PRODUCTS_LIST'

const getters = {
  [GET_CATEGORIES](state) {
    return state.categories
  },

  // category with the smallest orderHint is the feature category, invalid orderHint will be treated as POSITIVE_INFINITY.
  [GET_FEATURE_CATEGORY](state) {
    return state.categories[0]
  }
}

export default getters
