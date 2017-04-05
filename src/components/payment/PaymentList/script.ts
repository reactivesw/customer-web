import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    payments: Array
  }
})
export default class AddressList extends Vue {
  changeDefaultHandler(addrId) {
    this.$emit('defaultChanged', addrId)
  }

  deleteHandler(paymentId) {
    this.$emit('deletePayment', paymentId)
  }
}
