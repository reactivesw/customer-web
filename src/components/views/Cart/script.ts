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
    },

    subTotal(this: Vue.Component) {
      if (typeof this['cart'].lineItems === 'undefined') return

      const subTotalCentAmount = this['cart'].lineItems.reduce((sum, lineItem) => {
        return sum += lineItem.price.value.centAmount * lineItem.quantity
      }, 0)
      return {
        currencyCode: this['cart'].currencyCode,
        centAmount: subTotalCentAmount
      }
    }
  },

  components: {
    LineItem,
    OrderSummary
  }
} as Vue.ComponentOptions<Vue>
