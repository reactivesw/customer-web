import { products as productApi } from 'src/infrastructure/api_client'
import {SET_CURRENT_CATEGORY_PRODUCTS, SET_CURRENT_PRODUCT} from 'src/infrastructure/store/modules/products/mutations'
import {FETCH_CATEGORIES} from 'src/infrastructure/store/modules/categories/actions'

export const FETCH_CURRENT_CATEGORY_PRODUCTS = 'products/FETCH_CURRENT_CATEGORY_PRODUCTS'
export const FETCH_CURRENT_PRODUCT = 'products/FETCH_CURRENT_PRODUCT'

const actions = {

  /**
   * Fetch products of current category (determined by route)
   *
   * @param {any} { rootState, dispatch, commit }
   */
  async [FETCH_CURRENT_CATEGORY_PRODUCTS]({ rootState, dispatch, commit }) {
    // clean previous category products
    commit(SET_CURRENT_CATEGORY_PRODUCTS, [])

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
    const sku = rootState.route.params.sku
    const product = await productApi.getProduct(sku)
    commit(SET_CURRENT_PRODUCT, { product, productType: product.productType })
  }
}

export default actions
