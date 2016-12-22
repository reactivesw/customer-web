import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import Category from 'src/components/views/Category'
import Product from 'src/components/views/Product'

Vue.use(VueRouter)

const routes = [
  {
    name: 'category',
    path: '/categories/:catId',
    component: Category
  },
  {
    name: 'product',
    path: '/products/:productId',
    component: Product
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})
