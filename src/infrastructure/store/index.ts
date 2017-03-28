declare let process: any

import Vue from 'vue'
import Vuex from 'vuex'

import categories from './modules/categories'
import products from './modules/products'
import carts from './modules/carts'
import modal_dialogs from './modules/modal_dialogs'
import auth from './modules/auth'
import customer_info from './modules/customer_info'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    categories,
    products,
    carts,
    modal_dialogs,
    auth,
    customer_info
  },
  strict: debug
})

export default store
