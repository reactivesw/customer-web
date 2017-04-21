import Checkout from 'src/router_views/Checkout'

export default {
  name: 'checkout',
  path: '/checkout',
  component: Checkout,
  meta: { requiresAuth: true }
}
