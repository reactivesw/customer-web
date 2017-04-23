import Vue from 'vue'
import Component from 'vue-class-component'
import AddressCard from 'src/components/customer/AddressCard/script'
import PaymentCard from 'src/components/payment/PaymentCard/script'
import LineItemDisplay from 'src/components/cart/LineItemDisplay'

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

  get totalPrice() {
    return this['$moneyToString'](this.order.totalPrice)
  }

  get orderStatus() {
    switch (this.order.orderStatus) {
      case 'Payed':
        return this['$t']('order.status.payed')
      case 'Shipped':
        return this['$t']('order.status.shipped')
      case 'Complete':
        return this['$t']('order.status.complete')
      case 'Cancelled':
        return this['$t']('order.status.Cancelled')
      default:
        return this['$t']('order.status.unknow')
    }
  }
}
