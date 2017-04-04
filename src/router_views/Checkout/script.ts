import Vue from 'vue'
import Component from 'vue-class-component'

import CartDetails from 'src/components/cart/CartDetails'
import OrderSummary from 'src/components/cart/OrderSummary'
import ShippingInfo from 'src/router_views/Customer/ShippingInfo'
import PaymentInfo from 'src/router_views/Customer/PaymentInfo'

import { HAS_DEFAULT_ADDRESS }
  from 'src/infrastructure/store/modules/customer_info/getters'
import { HAS_SELECTED_PAYMENT }
  from 'src/infrastructure/store/modules/payment_info/getters'

@Component({
  components: {
    CartDetails,
    OrderSummary,
    ShippingInfo,
    PaymentInfo
  }
})
export default class Checkout extends Vue {
  // the checkout needs two pieces of info:
  // a selected shipping address and a selected payment
  // if meet both conditions, go to final review stage
  // in final stage, may still go back to change them
  // thus we need the following two flags
  isEditingShipping = false
  isEditingPayment = false

  get enablePlaceOrder() {
    return this.hasSelectedPayment && this.hasDefaultAddress
  }
  get showShipping() {
    return this.isEditingShipping || !this.hasDefaultAddress
  }

  get showPayment() {
    const canShow = this.isEditingPayment || !this.hasSelectedPayment
    return !this.showShipping && canShow
  }

  get showReview() {
    return !this.showShipping && !this.showPayment
  }

  get hasSelectedPayment() {
    return !this.$store.getters[HAS_SELECTED_PAYMENT]
  }

  get hasDefaultAddress() {
    return this.$store.getters[HAS_DEFAULT_ADDRESS]
  }
}

