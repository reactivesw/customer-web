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
}
