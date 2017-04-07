import Vue from 'vue'
import Component from 'vue-class-component'
import AddressCard from 'src/components/customer/AddressCard/script'
import PaymentCard from 'src/components/payment/PaymentCard/script'
import LineItemDisplay from 'src/components/cart/LineItemDisplay'
import { MoneyToString } from 'src/infrastructure/utils'

@Component({
  props: {
    order: Object
  },
  components: {
    AddressCard,
    PaymentCard,
    LineItemDisplay
  }
})
export default class OrderDetail extends Vue {
  order

  get totalPrice () {
    return MoneyToString(this.order.totalPrice)
  }
}
