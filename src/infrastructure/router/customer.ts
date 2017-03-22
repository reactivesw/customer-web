import Customer from 'src/router_views/Customer'
import CustomerInfo from 'src/router_views/Customer/Info'
import CustomerAddresses from 'src/router_views/Customer/Addresses'

export default {
  name: 'customer',
  path: '/customer',
  component: Customer,
  children: [
    {
      name: 'customer_info',
      path: 'info',
      component: CustomerInfo
    },
    {
      name: 'customer_addresses',
      path: 'addresses',
      component: CustomerAddresses
    },
    { path: '*', redirect: { name: 'customer_info' } } // redirect to customer info when visit /customer
  ],
  meta: { requiresAuth: true }
}
