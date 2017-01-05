import * as Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { GET_CART } from 'src/infrastructure/store/carts_types'

import LineItem from 'src/components/cart/LineItem'
import OrderSummary from 'src/components/cart/OrderSummary'

export default {
  name: 'cart',

  computed: {
    ...mapGetters({
      cart: GET_CART
    }),
    isEmpty(this: Vue.Component) {
      const lineItems = this['cart'].lineItems
      return (!lineItems) || (lineItems.length === 0)
    }
  },

  components: {
    LineItem,
    OrderSummary
  }
} as Vue.ComponentOptions<Vue>
