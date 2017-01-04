import Vue = require('vue')

import Lineitem from 'src/components/cart/Lineitem'
import OrderSummary from 'src/components/cart/OrderSummary'

export default {
  name: 'cart',
  components: {
    Lineitem,
    OrderSummary
  }
} as Vue.ComponentOptions<Vue>
