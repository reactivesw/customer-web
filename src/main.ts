import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import router from './router'
import App from './components/App'
import 'bootstrap/dist/js/bootstrap'
import './styles/style.scss'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
