import {
  SET_CURRENT_CATEGORY_PRODUCTS,
  SET_CURRENT_PRODUCT } from '../../products_types'

export default {
  [SET_CURRENT_CATEGORY_PRODUCTS] (state, products) {
    state.currentCategoryProducts = products
  },

  [SET_CURRENT_PRODUCT] (state, { product, productType }) {
    state.currentProduct = product
    state.currentProductType = productType
  }
}
