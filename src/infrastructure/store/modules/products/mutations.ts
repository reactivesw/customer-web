import { SET_CURRENT_CATEGORY_PRODUCTS } from '../../products_types'

export default {
  [SET_CURRENT_CATEGORY_PRODUCTS] (state, products) {
    state.currentCategoryProducts = products
  }
}
