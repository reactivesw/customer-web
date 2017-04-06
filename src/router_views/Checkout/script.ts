import Vue from 'vue'
import Component from 'vue-class-component'

import AddressCard from 'src/components/customer/AddressCard'
import PaymentCard from 'src/components/payment/PaymentCard'
import CartDetails from 'src/components/cart/CartDetails'
import OrderSummary from 'src/components/cart/OrderSummary'
import ShippingInfo from 'src/router_views/Customer/ShippingInfo'
import PaymentInfo from 'src/router_views/Customer/PaymentInfo'

import { PLACE_ORDER } from 'src/infrastructure/store/orders_types'
import { PlaceOrderPayload }
  from 'src/infrastructure/store/modules/orders/actions'

import { HAS_DEFAULT_ADDRESS,  GET_DEFAULT_ADDRESS }
  from 'src/infrastructure/store/modules/customer_info/getters'
import { HAS_SELECTED_PAYMENT, GET_SELECTED_PAYMENT }
  from 'src/infrastructure/store/modules/payment_info/getters'

@Component({
  components: {
    CartDetails,
    OrderSummary,
    ShippingInfo,
    PaymentInfo,
    AddressCard,
    PaymentCard
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

  placeOrderHandler() {
    const payload: PlaceOrderRequest = {
      customerId: this.customerInfo.id,
      addressId: this.defaultAddress.id,
      creditCardId: this.selectedPayment.id,
      cartId: this.currentCart.id
    }
    this.$store.dispatch(PLACE_ORDER, payload)
  }

  // used to manage UI state
  // one-way dependency: showShipping => showPayment => showReview
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

  get isPlaceOrderEnabled() {
    return this.hasSelectedPayment && this.hasDefaultAddress
  }

  // UI event handler
  editShippingHandler() {
    this.isEditingShipping = true
  }

  shippingContinueHandler() {
    this.isEditingShipping = false
  }

  editPaymentHandler() {
    this.isEditingPayment = true
  }

  paymentContinueHandler() {
    this.isEditingPayment = false
  }

  // store operations
  get hasDefaultAddress() {
    return this.$store.getters[HAS_DEFAULT_ADDRESS]
  }

  get defaultAddress() {
    return this.$store.getters[GET_DEFAULT_ADDRESS]
  }

  get hasSelectedPayment() {
    return this.$store.getters[HAS_SELECTED_PAYMENT]
  }

  get selectedPayment() {
    return this.$store.getters[GET_SELECTED_PAYMENT]
  }

  get customerInfo() {
    return this.$store.getters[GET_CUSTOMER_INFO]
  }

  get currentCart() {
    return this.$store.getters[GET_CART]
  }
}

