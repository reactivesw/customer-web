declare let process: any

import * as Vue from 'vue'
import * as Vuex from 'vuex'

import categories from './modules/categories'
import products from './modules/products'
import carts from './modules/carts'
import modal_dialogs from './modules/modal_dialogs'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    categories,
    products,
    carts,
    modal_dialogs
  },
  strict: debug
})
