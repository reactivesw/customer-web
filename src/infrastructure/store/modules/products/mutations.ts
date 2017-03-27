import {
  SET_CURRENT_CATEGORY_PRODUCTS,
  SET_CURRENT_PRODUCT } from 'src/infrastructure/store/products_types'

export default {
  // set current category state for category view.
  [SET_CURRENT_CATEGORY_PRODUCTS] (state, products) {
    state.currentCategoryProducts = products
  },

  // set current product state for product detail view.
  [SET_CURRENT_PRODUCT] (state, { product, productType }) {
    state.currentProduct = product
    state.currentProductType = productType
  }
}
