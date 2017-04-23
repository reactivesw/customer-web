import Vue from 'vue'
import Component from 'vue-class-component'

import {
  GET_CART, GET_IS_EMPTY
} from 'src/infrastructure/store/modules/carts/getters'
import {
  FETCH_CART, REMOVE_LINE_ITEM, SET_LINE_ITEM_QUANTITY
} from 'src/infrastructure/store/modules/carts/actions'

import LineItem from 'src/components/cart/LineItem'

@Component({
  components: {
    LineItem
  }
})
export default class CardDetails extends Vue {


  // sotre operations
  get isEmpty() {
    return this.$store.getters[GET_IS_EMPTY]
  }

  get cart() {
    return this.$store.getters[GET_CART]
  }

  changeQuantity(data) {
    this.$store.dispatch(SET_LINE_ITEM_QUANTITY, data)
  }

  removeLineItem(lineItem) {
    this.$store.dispatch(REMOVE_LINE_ITEM, lineItem)
  }

  created() {
    this.fetchCart()
  }

  fetchCart() {
    return this.$store.dispatch(FETCH_CART)
  }
}

