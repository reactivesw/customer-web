export const SET_CATEGORIES = 'categories/SET_CATEGORIES'

const mutations = {
  [SET_CATEGORIES](state, categories) {
    state.categories = categories
  }
}

export default mutations
