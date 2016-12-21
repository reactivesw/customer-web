import restCall from 'src/infrastructure/store/api_client'
import { FETCH_CATEGORIES, SET_CATEGORIES } from '../../categories_types'

export default {
  [FETCH_CATEGORIES] ({ commit }) {
    return restCall.get('/categories')
    .then((response) => {
      commit(SET_CATEGORIES, response.data.results)
    })
  }
}
