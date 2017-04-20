import Vue from 'vue'
import Component from 'vue-class-component'
import { GET_TOTAL_PRICE, GET_IS_EMPTY }
  from 'src/infrastructure/store/modules/carts/getters'

@Component({
})
export default class OrderSummary extends Vue  {
  get subTotal() {
    const totalPrice = this.$store.getters[GET_TOTAL_PRICE]
    return this['$moneyToString'](totalPrice)
  }

  get isEmpty() {
    return this.$store.getters[GET_IS_EMPTY]
  }
}
