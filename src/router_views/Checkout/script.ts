import Vue from 'vue'
import Component from 'vue-class-component'

import CartDetails from 'src/components/cart/CartDetails'
import OrderSummary from 'src/components/cart/OrderSummary'
import ShippingInfo from 'src/router_views/Customer/ShippingInfo'

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

  get isShippingSelected() {
    return false
  }

  get isPaymentSelected() {
    return false
  }
}

