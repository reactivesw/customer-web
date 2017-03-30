import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { SIGN_OUT } from 'src/infrastructure/store/auth_types'
import { FETCH_CUSTOMER_INFO } from 'src/infrastructure/store/customer_info_types'

export default {
  name: 'Customer',

  methods: {
    ...mapActions({
      signOut: SIGN_OUT,
      fetchCustomerInfo: FETCH_CUSTOMER_INFO
    })
  },

  // go fetch backend data
  created (this: Component) {
    this['fetchCustomerInfo']()
  },
}
