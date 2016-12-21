import apiClient from 'src/infrastructure/store/api_client'
import { FETCH_CURRENT_CATEGORY_PRODUCTS, SET_CURRENT_CATEGORY_PRODUCTS } from '../../products_types'

export default {
  [FETCH_CURRENT_CATEGORY_PRODUCTS] ({ rootState, commit }) {
    return apiClient.get('/product-projections', {
      params: {
        where: `categoryId:"${rootState.route.params.catid}"`
      }
    })
    .then((response) => {
      console.log(response)
      commit(SET_CURRENT_CATEGORY_PRODUCTS, response.data.results)
    })
  }
}
