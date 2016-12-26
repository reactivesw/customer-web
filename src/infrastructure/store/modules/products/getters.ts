import {
  GET_CURRENT_CATEGORY_PRODUCTS,
  GET_CURRENT_PRODUCT,
  GET_CURRENT_VARIANT } from '../../products_types'

export default {
  [GET_CURRENT_CATEGORY_PRODUCTS] (state) {
    return state.currentCategoryProducts
  },

  [GET_CURRENT_PRODUCT] (state) {
    return state.currentProduct
  },

  [GET_CURRENT_VARIANT] (state, getters, rootState) {
    const sku = rootState.route.params.sku

    let variants
    if (state.currentProduct) {
      variants = [
        ...state.currentProduct.masterData.current.variants,
        state.currentProduct.masterData.current.masterVariant
      ]
    } else {
      variants = []
    }

    const currentVariant = variants.filter((variant) => {
      return variant.sku === sku
    })[0]
    return currentVariant
  }
}
