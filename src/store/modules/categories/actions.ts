import axios from 'axios'
import { FETCH_CATEGORIES, SET_CATEGORIES } from '../../categories-types'

export default {
  [FETCH_CATEGORIES] ({ commit }) {
    return axios.get('http://localhost:8088/categories')
    .then((response) => {
      commit(SET_CATEGORIES, response.data.results)
    })
  }
}
