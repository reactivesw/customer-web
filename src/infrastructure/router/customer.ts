import Customer from 'src/router_views/Customer'
import Account from 'src/router_views/Customer/Account'
import ShippingInfo from 'src/router_views/Customer/ShippingInfo'
import PaymentInfo from 'src/router_views/Customer/PaymentInfo'

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
    {
      name: 'customer-payment-info',
      path: 'payment-info',
      component: PaymentInfo
    },
    { path: '*', redirect: { name: 'customer-account' } } // redirect to account when visit /customer
  ],
  meta: { requiresAuth: true }
}
