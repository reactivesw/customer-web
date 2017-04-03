import Vue from 'vue'
import Component from 'vue-class-component'

import CartDetails from 'src/components/cart/CartDetails'
import OrderSummary from 'src/components/cart/OrderSummary'
import { GET_IS_EMPTY }
  from 'src/infrastructure/store/modules/carts/getters'

@Component({
  components: {
    CartDetails,
    OrderSummary
  }
})
export default class Cart extends Vue {
  checkoutClickEventHandler() {
    this.$router.push({ path: 'checkout' })
  }

  get isEmptyCart() {
    return this.$store.getters[GET_IS_EMPTY]
  }
}
