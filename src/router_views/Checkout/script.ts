import Vue from 'vue'
import Component from 'vue-class-component'

import CartDetails from 'src/components/cart/CartDetails'
import OrderSummary from 'src/components/cart/OrderSummary'
import ShippingInfo from 'src/router_views/Customer/ShippingInfo'

import { HAS_DEFAULT_ADDRESS }
  from 'src/infrastructure/store/modules/customer_info/getters'

@Component({
  components: {
    CartDetails,
    OrderSummary,
    ShippingInfo
  }
})
export default class Checkout extends Vue {
  // the checkout needs two pieces of info:
  // a selected shipping address and
  // and a selected payment
  flipPayment = false

  get hasDefaultPayment() {
    return this.flipPayment
  }

  get hasDefaultAddress() {
    return this.$store.getters[HAS_DEFAULT_ADDRESS]
  }
}

