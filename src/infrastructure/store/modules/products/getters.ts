import {
  GET_CURRENT_CATEGORY_PRODUCTS,
  GET_CURRENT_PRODUCT } from '../../products_types'

export default {
  [GET_CURRENT_CATEGORY_PRODUCTS] (state) {
    return state.currentCategoryProducts
  },

  [GET_CURRENT_PRODUCT] (state) {
    return state.currentProduct
  }
}
