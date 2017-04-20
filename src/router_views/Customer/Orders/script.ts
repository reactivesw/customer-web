import Vue from 'vue'
import Component from 'vue-class-component'
import {FETCH_ORDER, FETCH_ORDERS} from 'src/infrastructure/store/modules/orders/actions'
import {
  FetchOrderByOrderIdRequest,
  FetchOrderListByCustomerIdRequest
} from 'src/infrastructure/api_client/customer/orders'
import {GET_CUSTOMER_ID} from 'src/infrastructure/store/modules/auth/getters'
import {GET_CURRENT_ORDER, GET_ORDERS} from 'src/infrastructure/store/modules/orders/getters'
import OrderDetail from 'src/components/order/OrderDetail'
import OrderList from 'src/components/order/OrderList'

// if orderId presented, show OrderDetail, else show orderList.
// This component only fetch data
@Component({
  props: {
    orderId: String
  },
  components: {
    OrderDetail,
    OrderList
  },
  watch: {
    isOrderDetail (newValue) {
      this['fetchData']()
    }
  }
})
export default class Orders extends Vue {
  orderId: string

  created() {
    this.fetchData()
  }

  get isOrderDetail () {
    return !!this.orderId
  }

  get customerId () {
    return this.$store.getters[GET_CUSTOMER_ID]
  }

  get orders () {
    return this.$store.getters[GET_ORDERS]
  }

  get order () {
    return this.$store.getters[GET_CURRENT_ORDER]
  }

  fetchOrder () {
    const request: FetchOrderByOrderIdRequest = {
      orderId: this.orderId
    }
    this.$store.dispatch(FETCH_ORDER, request)
  }

  fetchOrders () {
    const request: FetchOrderListByCustomerIdRequest = {
      customerId: this.customerId
    }
    this.$store.dispatch(FETCH_ORDERS, request)
  }

  fetchData () {
    if (this.isOrderDetail) {
      this.fetchOrder()
    } else {
      this.fetchOrders()
    }
  }
}
