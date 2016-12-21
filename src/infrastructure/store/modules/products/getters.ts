import { GET_CURRENT_CATEGORY_PRODUCTS } from '../../products_types'

export default {
  [GET_CURRENT_CATEGORY_PRODUCTS] (state) {
    return state.currentCategoryProducts
  }
}
