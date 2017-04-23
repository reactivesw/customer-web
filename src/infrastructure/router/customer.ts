import Customer from 'src/router_views/Customer'
import Account from 'src/router_views/Customer/Account'
import ShippingInfo from 'src/router_views/Customer/ShippingInfo'
import PaymentInfo from 'src/router_views/Customer/PaymentInfo'
import Orders from 'src/router_views/Customer/Orders'

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
      name: 'customer-orders',
      path: 'orders/:orderId?',
      props: true, // make route params to component props, https://router.vuejs.org/en/essentials/passing-props.html
      component: Orders
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
