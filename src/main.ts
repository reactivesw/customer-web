import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import router from './infrastructure/router'
import store from './infrastructure/store'
import App from './components/views/App'
import 'bootstrap/dist/js/bootstrap'
import './styles/style.scss'

import setLocales from './infrastructure/i18n'
setLocales(Vue)

// setup vuex-router-sync so that route state are sync with vuex
import { sync } from 'vuex-router-sync'
sync(store, router)

let a = null
if (a == null) a = 1

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
