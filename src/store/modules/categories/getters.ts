import { GET_CATEGORIES } from '../../categories-types'

export default {
  [GET_CATEGORIES] (state) {
    return state.categories
  }
}
