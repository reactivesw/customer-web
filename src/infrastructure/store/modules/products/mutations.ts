import {
  SET_CURRENT_CATEGORY_PRODUCTS,
  SET_CURRENT_PRODUCT } from '../../products_types'

export default {
  [SET_CURRENT_CATEGORY_PRODUCTS] (state, products) {
    state.currentCategoryProducts = products
  },

  [SET_CURRENT_PRODUCT] (state, { product, productType }) {
    // sort variants of product by their sku string before store
    product.masterData.current.variants.sort((variant, anotherVariant) => {
      return variant.sku < anotherVariant.sku
    })

    state.currentProduct = product
    state.currentProductType = productType
  }
}
