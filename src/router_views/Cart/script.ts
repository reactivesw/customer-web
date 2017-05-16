import Vue from 'vue'
import Component from 'vue-class-component'

import CartDetails from 'src/components/cart/CartDetails'
import OrderSummary from 'src/components/cart/OrderSummary'
import { GET_IS_EMPTY } from 'src/infrastructure/store/modules/carts/getters'

import { FETCH_CART } from 'src/infrastructure/store/modules/carts/actions'
import { GET_FEATURE_CATEGORY } from 'src/infrastructure/store/modules/categories/getters'
import { FETCH_CATEGORIES } from 'src/infrastructure/store/modules/categories/actions'

@Component({
  components: {
    CartDetails,
    OrderSummary
  }
})
export default class Cart extends Vue {
  created() {
    this.fetchCart()
    this.fetchCategories()
  }

  checkoutClickEventHandler() {
    this.$router.push({ path: 'checkout' })
  }

  // store operations
  get isEmptyCart() {
    return this.$store.getters[GET_IS_EMPTY]
  }

  get featureCategory() {
    return this.$store.getters[GET_FEATURE_CATEGORY]
  }

  fetchCategories() {
    return this.$store.dispatch(FETCH_CATEGORIES)
  }

  fetchCart() {
    return this.$store.dispatch(FETCH_CART)
  }

  backToShopping() {
    this['$router'].push({ name: 'featureCategory' })
  }
}
