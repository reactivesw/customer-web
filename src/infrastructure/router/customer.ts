import Customer from 'src/router_views/Customer'
import Account from 'src/router_views/Customer/Account'
import ShippingInfo from 'src/router_views/Customer/ShippingInfo'

export default {
  name: 'customer',
  path: '/customer',
  component: Customer,
  children: [
    {
      name: 'customer-account',
      path: 'account',
      component: Account
    },
    {
      name: 'customer-shipping-info',
      path: 'shipping-info',
      component: ShippingInfo
    },
    { path: '*', redirect: { name: 'customer-account' } } // redirect to account when visit /customer
  ],
  meta: { requiresAuth: true }
}
