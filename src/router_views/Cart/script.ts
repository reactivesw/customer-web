import Vue from 'vue'
import Component from 'vue-class-component'

import CartDetails from 'src/components/cart/CartDetails'
import OrderSummary from 'src/components/cart/OrderSummary'
import { GET_IS_EMPTY }
  from 'src/infrastructure/store/modules/carts/getters'

import { FETCH_CART } from 'src/infrastructure/store/carts_types'

@Component({
  components: {
    CartDetails,
    OrderSummary
  }
})
export default class Cart extends Vue {
  created() {
    this.fetchCart()
  }

  checkoutClickEventHandler() {
    this.$router.push({ path: 'checkout' })
  }

  // store operations
  get isEmptyCart() {
    return this.$store.getters[GET_IS_EMPTY]
  }

  fetchCart() {
    return this.$store.dispatch(FETCH_CART)
  }
}
