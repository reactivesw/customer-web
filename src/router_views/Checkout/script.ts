import Vue from 'vue'
import Component from 'vue-class-component'

import CartDetails from 'src/components/cart/CartDetails'
import OrderSummary from 'src/components/cart/OrderSummary'

@Component({
  components: {
    CartDetails,
    OrderSummary
  }
})
export default class Checkout extends Vue {

}

