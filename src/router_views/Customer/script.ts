import Vue from 'vue'
import Component from 'vue-class-component'

import { FETCH_CUSTOMER_INFO }
  from 'src/infrastructure/store/modules/customer_info/actions'

import { SIGN_OUT } from 'src/infrastructure/store/auth_types'

@Component({
})
export default class Customer extends Vue  {
  created() {
    this.fetchCustomerInfo()
  }

  // store operations
  fetchCustomerInfo() {
    this.$store.dispatch(FETCH_CUSTOMER_INFO)
  }

  signOut() {
    this.$store.dispatch(SIGN_OUT)
  }
}
