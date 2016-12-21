import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import Category from 'src/components/views/Category'

Vue.use(VueRouter)

const routes = [
  {
    name: 'category',
    path: '/category/:id',
    component: Category
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})
