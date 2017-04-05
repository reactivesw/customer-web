import Vue from 'vue'
import Component from 'vue-class-component'

import { GET_CUSTOMER_ID } from 'src/infrastructure/store/auth_types'
import { FETCH_PAYMENTS,
  ADD_CREDIT_CARD,
  SET_SELECTED,
  DELETE_CREDIT_CARD }
  from 'src/infrastructure/store/modules/payment_info/actions'

import { CreditCardDraft, DefaultCardRequest, DeleteCardRequest }
  from 'src/infrastructure/api_client/customer/payment_models'

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
    let request: CreditCardDraft = {
      customerId: this.customerId,
      ...data
    }
    this.$store.dispatch(ADD_CREDIT_CARD, request)
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
    const request: DefaultCardRequest = {
      customerId: this.customerId,
      creditCardId: this.confirmChangeDefaultId
    }
    this.$store.dispatch(SET_SELECTED, request)

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
    const request: DeleteCardRequest = {
      creditCardId: this.confirmDeletePaymentId,
      version: 'version???'
    }
    this.$store.dispatch(DELETE_CREDIT_CARD, request)
    this.confirmNoDeletePaymentHandler()
  }

  confirmNoDeletePaymentHandler() {
    this.showConfirmDeletePayment = false
    this.confirmDeletePaymentId = ''
  }
  // END: handle delete event
}
