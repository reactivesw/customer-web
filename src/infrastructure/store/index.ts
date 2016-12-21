declare let process: any

import * as Vue from 'vue'
import * as Vuex from 'vuex'

import categories from './modules/categories'
import products from './modules/products'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    categories,
    products
  },
  strict: debug
})
