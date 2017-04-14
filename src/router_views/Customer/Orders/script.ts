import Vue from 'vue'
import Component from 'vue-class-component'
import {FETCH_ORDERS} from 'src/infrastructure/store/modules/orders/actions'
import {FetchOrderListByCustomerIdRequest} from 'src/infrastructure/api_client/customer/orders'
import {GET_CUSTOMER_ID} from 'src/infrastructure/store/modules/auth/getters'
import {GET_ORDERS} from 'src/infrastructure/store/modules/orders/getters'

@Component({
  props: {
    orders: Array
  }
})
export default class Orders extends Vue {

  created() {
    this.fetchOrders()
  }

  get customerId () {
    return this.$store.getters[GET_CUSTOMER_ID]
  }

  get orders () {
    return this.$store.getters[GET_ORDERS]
  }

  fetchOrders () {
    const request: FetchOrderListByCustomerIdRequest = {
      customerId: this.customerId
    }
    this.$store.dispatch(FETCH_ORDERS, request)
  }
}
