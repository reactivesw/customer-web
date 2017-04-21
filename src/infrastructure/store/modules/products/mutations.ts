export const SET_CURRENT_CATEGORY_PRODUCTS = 'products/SET_CURRENT_CATEGORY_PRODUCTS'
export const SET_CURRENT_PRODUCT = 'products/SET_CURRENT_PRODUCT'

const mutations = {
  // set current category state for category view.
  [SET_CURRENT_CATEGORY_PRODUCTS](state, products) {
    state.currentCategoryProducts = products
  },

  // set current product state for product detail view.
  [SET_CURRENT_PRODUCT](state, { product, productType }) {
    state.currentProduct = product
    state.currentProductType = productType
  }
}

export default mutations
