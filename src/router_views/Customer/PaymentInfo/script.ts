import Vue from 'vue'
import Component from 'vue-class-component'

import { GET_CUSTOMER_ID } from 'src/infrastructure/store/auth_types'

import { FETCH_PAYMENTS } from 'src/infrastructure/store/modules/payment_info/actions'

import { GET_PAYMENTS } from 'src/infrastructure/store/modules/payment_info/getters'

import CreditCard from 'src/components/payment/CreditCard'
import PaymentList from 'src/components/payment/PaymentList'
import ConfirmDialog from 'src/components/utility/ConfirmDialog'

@Component({
  components: {
    CreditCard,
    PaymentList,
    ConfirmDialog
  }
})
export default class PaymentInfo extends Vue {
  // first show payment list
  showPaymentList = true

  showConfirmChangeDefault = false
  confirmChangeDefaultId = ''

  showConfirmDeletePayment = false
  confirmDeletePaymentId = ''

  // fetch payments when created
  created() {
    this.fetchPayments()
  }

  fetchPayments() {
    if (this.customerId) {
      this.$store.dispatch(FETCH_PAYMENTS)
    }
  }

  get customerId() {
    return this.$store.getters[GET_CUSTOMER_ID]
  }

  get payments() { 
    return this.$store.getters[GET_PAYMENTS]
  }

  // BEGIN: add a credit card
  clickAddCreditCardHanlder() {
    this.showPaymentList = false
  }

  addCreditCardHanlder(data) {
    let request = {
      customerId: this.customerId,
      ...data
    }
    // this.$store.dispatch('add???', request)
    this.showPaymentList = true
  }

  cancelAddCreditCardHandler() {
    this.showPaymentList = true
  }
  // END: add credit card

  // BEGIN: handle change default
  defaultChangedHandler(paymentId) {
    this.showConfirmChangeDefault = true
    this.confirmChangeDefaultId = paymentId
  }

  confirmYesChangeDefaultHandler() {
    // dispatch change action

    // then clean up
    this.confirmNoChangeDefaultHandler()
  }

  confirmNoChangeDefaultHandler() {
    this.showConfirmChangeDefault = false
    this.confirmChangeDefaultId = ''
  }
  // END: handle change default

  // BEGIN: handle delete event
  deletePaymentHandler(paymentId) {
    this.showConfirmDeletePayment = true
    this.confirmDeletePaymentId = paymentId
  }

  confirmYesDeletePaymentHandler() {
    // dispatch delete

    this.confirmNoDeletePaymentHandler()
  }

  confirmNoDeletePaymentHandler() {
    this.showConfirmDeletePayment = false
    this.confirmDeletePaymentId = ''
  }
  // END: handle delete event
}
