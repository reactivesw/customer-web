import { products as productApi } from 'src/infrastructure/api_client'
import {
  FETCH_CURRENT_CATEGORY_PRODUCTS,
  SET_CURRENT_CATEGORY_PRODUCTS,
  FETCH_CURRENT_PRODUCT,
  SET_CURRENT_PRODUCT } from '../../products_types'
import { FETCH_CATEGORIES } from '../../categories_types'

export default {

  /**
   * Fetch products of current category (determined by route)
   *
   * @param {any} { rootState, dispatch, commit }
   */
  async [FETCH_CURRENT_CATEGORY_PRODUCTS]({ rootState, dispatch, commit }) {
    // make sure we already have categories data
    const categories = await dispatch(FETCH_CATEGORIES)

    if (categories) {
      // find the current category and search for it's products
      const slug = rootState.route.params.catSlug
      const category = rootState.categories.categories.find((category) => {
        return category.slug === slug
      })
      const products = await productApi.getProductProjections(category.id)
      commit(SET_CURRENT_CATEGORY_PRODUCTS, products)
    }
  },

  /**
   * Fetch current product (determined by route) info
   *
   * @param {any} { rootState, commit }
   */
  async [FETCH_CURRENT_PRODUCT]({ rootState, commit }) {
    const slug = rootState.route.params.productSlug
    const product = await productApi.getProduct(slug)
    const productType = await productApi.getProductType(product.productType.id)
    commit(SET_CURRENT_PRODUCT, { product, productType })
  }
}
