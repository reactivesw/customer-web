import Vue from 'vue'
import VueLadda from 'vue-ladda'
import Component from 'vue-class-component'

import AddressCard from 'src/components/customer/AddressCard'
import PaymentCard from 'src/components/payment/PaymentCard'
import CartDetails from 'src/components/cart/CartDetails'
import OrderSummary from 'src/components/cart/OrderSummary'
import ShippingInfo from 'src/router_views/Customer/ShippingInfo'
import PaymentInfo from 'src/router_views/Customer/PaymentInfo'
import OrderDetail from 'src/components/order/OrderDetail'

import {
  HAS_DEFAULT_ADDRESS, GET_DEFAULT_ADDRESS, GET_CUSTOMER_INFO
} from 'src/infrastructure/store/modules/customer_info/getters'
import { HAS_SELECTED_PAYMENT, GET_SELECTED_PAYMENT } from 'src/infrastructure/store/modules/payment_info/getters'
import { PlaceOrderRequest } from 'src/infrastructure/api_client/customer/orders'
import { PLACE_ORDER } from 'src/infrastructure/store/modules/orders/actions'
import { GET_CART } from 'src/infrastructure/store/modules/carts/getters'

@Component({
  components: {
    CartDetails,
    OrderSummary,
    ShippingInfo,
    PaymentInfo,
    AddressCard,
    PaymentCard,
    OrderDetail,
    VueLadda
  }
})
export default class Checkout extends Vue {
  // the order server returned after place order
  placedOrder: any = null

  // the checkout needs two pieces of info:
  // a selected shipping address and a selected payment
  // if meet both conditions, go to final review stage
  // in final stage, may still go back to change them
  // thus we need the following two flags
  isEditingShipping = false
  isEditingPayment = false

  // for place order button loading indicator
  loading = false

  async placeOrderHandler() {
    this.loading = true
    const payload: PlaceOrderRequest = {
      customerId: this.customerInfo.id,
      addressId: this.defaultAddress.id,
      creditCardId: this.selectedPayment.id,
      cartId: this.currentCart.id
    }
    try {
      this.placedOrder = await this.$store.dispatch(PLACE_ORDER, payload)
    } catch (e) {
      // TODO: handle errors
    } finally {
      this.loading = false
    }
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

  // if placedOrder has value, means place order request has been sent, show placed result.
  get showPlacedResult() {
    return !!this.placedOrder
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

