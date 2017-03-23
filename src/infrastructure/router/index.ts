import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import store from 'src/infrastructure/store'
import Category from 'src/router_views/Category'
import Product from 'src/router_views/Product'
import Cart from 'src/router_views/Cart'
import customer from './customer'
import { SHOW_SIGN_IN } from 'src/infrastructure/store/modal_dialogs_types'

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
    path: '/products/:sku',
    component: Product
  },
  {
    name: 'cart',
    path: '/cart',
    component: Cart
  },
  {
    ...customer
  },
  {
    path: '*',
    redirect: {
      name: 'featureCategory'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach(function (to, from, next) {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.state.auth.customer.id) {
    // if route requires auth and user isn't authenticated, show sign in modal and abort current navigation.
    store.dispatch(SHOW_SIGN_IN)
    // seems like a router bug, navigation triggered by next(false) is not going to redirect properly.
    // to solve it, redirect navigation to featureCategory if the from url is '\'.
    if (from.fullPath === '/') {
      next({ name: 'featureCategory' })
    } else {
      next(false)
    }
  } else {
    next()
  }
})

export default router
