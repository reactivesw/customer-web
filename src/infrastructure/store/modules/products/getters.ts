import {
  GET_CURRENT_CATEGORY_PRODUCTS,
  GET_CURRENT_PRODUCT,
  GET_CURRENT_PRODUCT_VARIANT,
  GET_CURRENT_PRODUCT_VARIANTS,
  GET_CURRENT_PRODUCT_TYPE } from 'src/infrastructure/store/products_types'

const getters = {
  [GET_CURRENT_CATEGORY_PRODUCTS] (state) {
    return state.currentCategoryProducts
  },

  [GET_CURRENT_PRODUCT] (state) {
    return state.currentProduct
  },

  [GET_CURRENT_PRODUCT_VARIANTS] (state) {
    return getCurrentVariants(state)
  },

  [GET_CURRENT_PRODUCT_VARIANT] (state, getters, rootState) {
    const sku = rootState.route.params.sku

    const variants = getCurrentVariants(state)

    const currentVariant = variants.find((variant) => {
      return variant.sku === sku
    })
    return currentVariant
  },

  [GET_CURRENT_PRODUCT_TYPE] (state) {
    return state.currentProductType
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
      state.currentProduct.masterVariant,
      ...state.currentProduct.variants
    ]
  } else {
    return []
  }
}

export default getters
