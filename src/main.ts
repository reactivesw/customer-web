// import core-js polyfill at the top of source code, so they're available in everywhere.
import './infrastructure/utils/polyfills'
// Make sure global style is imported before App component, so the global style can't overwrite component styles.
import 'src/styles/style.scss'
import 'bootstrap/dist/js/bootstrap'
import Vue from 'vue'
import router from './infrastructure/router'
import store from './infrastructure/store'
import App from 'src/router_views/App'

import Utils from './infrastructure/utils'
Vue.use(Utils)

import setLocales from './infrastructure/i18n'
setLocales(Vue)

// setup vuex-router-sync so that route state are sync with vuex
import { sync } from 'vuex-router-sync'
sync(store, router)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
