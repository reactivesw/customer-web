import api from 'src/libs/store/api'
import { FETCH_CATEGORIES, SET_CATEGORIES } from '../../categories-types'

export default {
  [FETCH_CATEGORIES] ({ commit }) {
    return api.get('/categories')
    .then((response) => {
      commit(SET_CATEGORIES, response.data.results)
    })
  }
}
