import Vue from 'vue'
import Component from 'vue-class-component'

import PaymentCard from '../PaymentCard'

@Component({
  props: {
    payments: Array
  },
  components: {
    PaymentCard
  }
})
export default class AddressList extends Vue {
  changeDefaultHandler(payment) {
    this.$emit('defaultChanged', payment)
  }

  deleteHandler(payment) {
    this.$emit('deletePayment', payment)
  }
}
