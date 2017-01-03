import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import BackToShopping from 'src/components/frame/BackToShopping'
import Lineitem from 'src/components/cart/Lineitem'
import OrderSummary from 'src/components/cart/OrderSummary'

export default {
  name: 'cart',
  components: {
    BackToShopping,
    Lineitem,
    OrderSummary
  }
}
