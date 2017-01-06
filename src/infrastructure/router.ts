import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import Category from 'src/router_views/Category'
import Product from 'src/router_views/Product'
import Cart from 'src/router_views/Cart'

Vue.use(VueRouter)

const routes = [
  // map '/categories' to Category to dismiss vue-router warning
  {
    name: 'featureCategory',
    path: '/categories',
    component: Category
  },
  {
    name: 'categories',
    path: '/categories/:catSlug',
    component: Category
  },
  {
    name: 'products',
    path: '/products/:productSlug/:sku',
    component: Product
  },
  {
    name: 'cart',
    path: '/cart',
    component: Cart
  },
  {
    path: '*',
    redirect: {
      name: 'featureCategory'
    }
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})
