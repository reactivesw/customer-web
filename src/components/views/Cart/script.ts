import * as Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { GET_CART } from 'src/infrastructure/store/carts_types'

import Lineitem from 'src/components/cart/Lineitem'
import OrderSummary from 'src/components/cart/OrderSummary'

export default {
  name: 'cart',

  computed: {
    ...mapGetters({
      cart: GET_CART
    })
  },

  components: {
    Lineitem,
    OrderSummary
  }
} as Vue.ComponentOptions<Vue>
