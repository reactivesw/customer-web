import {
  GET_CURRENT_CATEGORY_PRODUCTS,
  GET_CURRENT_PRODUCT,
  GET_CURRENT_VARIANT,
  GET_CURRENT_PRODUCT_VARIANTS } from '../../products_types'

export default {
  [GET_CURRENT_CATEGORY_PRODUCTS] (state) {
    return state.currentCategoryProducts
  },

  [GET_CURRENT_PRODUCT] (state) {
    return state.currentProduct
  },

  [GET_CURRENT_PRODUCT_VARIANTS] (state) {
    return getCurrentVariants(state)
  },

  [GET_CURRENT_VARIANT] (state, getters, rootState) {
    const sku = rootState.route.params.sku

    const variants = getCurrentVariants(state)

    const currentVariant = variants.filter((variant) => {
      return variant.sku === sku
    })[0]
    return currentVariant
  }
}

/**
 * get variants of current product
 *
 * @param {any} state
 * @returns
 */
function getCurrentVariants (state) {
  if (state.currentProduct) {
    return [
      ...state.currentProduct.masterData.current.variants,
      state.currentProduct.masterData.current.masterVariant
    ]
  } else {
    return []
  }
}
