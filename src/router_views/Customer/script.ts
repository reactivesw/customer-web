import Vue from 'vue'
import Component from 'vue-class-component'

import { SIGN_OUT } from 'src/infrastructure/store/auth_types'
import { FETCH_CUSTOMER_INFO } from 'src/infrastructure/store/customer_info_types'

@Component({
})
export default class Customer extends Vue  {
  created() {
    this.fetchCustomerInfo()
  }

  fetchCustomerInfo() {
    this.$store.dispatch(FETCH_CUSTOMER_INFO)
  }

  signOut() {
    this.$store.dispatch(SIGN_OUT)
  }
}
