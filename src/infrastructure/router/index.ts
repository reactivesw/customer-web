import Vue from 'vue'
import VueRouter from 'vue-router'

import store from 'src/infrastructure/store'
import { GET_IS_LOGGED_IN } from 'src/infrastructure/store/auth_types'

import Category from 'src/router_views/Category'
import Product from 'src/router_views/Product'
import Cart from 'src/router_views/Cart'
import customer from './customer'
import chekcout from './checkout'
import { SHOW_SIGN_IN } from 'src/infrastructure/store/modal_dialogs_types'

Vue.use(VueRouter)

const routes = [
  // map '/categories' to Category to dismiss vue-router warning
  {
    name: 'home',
    path: '/',
    redirect: '/categories'
  },
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
    ...chekcout
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
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters[GET_IS_LOGGED_IN]) {
    // if route requires auth and user isn't authenticated, show sign in modal and abort current navigation.
    store.dispatch(SHOW_SIGN_IN)
    // seems like a router bug, navigation triggered by next(false) is not going to redirect properly.
    if (from.fullPath === '/') {
      next({ name: 'home' })
    } else {
      next(false)
    }
  } else {
    next()
  }
})

export default router
