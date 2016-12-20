import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import router from './libs/router'
import App from './components/views/App'
import 'bootstrap/dist/js/bootstrap'
import './styles/style.scss'

import setLocales from './libs/i18n'
setLocales(Vue)

import store from './libs/store'

let a = null
if (a == null) a = 1

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
