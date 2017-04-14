export const GET_CURRENT_CATEGORY_PRODUCTS = 'products/GET_CURRENT_CATEGORY_PRODUCTS'
export const GET_CURRENT_PRODUCT = 'products/GET_CURRENT_PRODUCT'
export const GET_CURRENT_PRODUCT_TYPE = 'products/GET_CURRENT_PRODUCT_TYPE'
export const GET_CURRENT_PRODUCT_VARIANT = 'products/GET_CURRENT_PRODUCT_VARIANT'
export const GET_CURRENT_PRODUCT_VARIANTS = 'products/GET_CURRENT_PRODUCT_VARIANTS'

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
