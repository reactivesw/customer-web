import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import Category from './components/Category'

Vue.use(VueRouter)

const routes = [
  { path: '', component: Category }
]

export default new VueRouter({
  mode: 'history',
  routes
})
