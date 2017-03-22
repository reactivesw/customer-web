import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { SIGN_OUT } from 'src/infrastructure/store/auth_types'
import * as customerInfoTypes from 'src/infrastructure/store/customer_info_types'

export default {
  name: 'CustomerInfo',

  methods: {
    ...mapActions({
      signOut: SIGN_OUT,
      fetchCustomerInfo: customerInfoTypes.FETCH_CUSTOMER_INFO
    })
  },

  computed: {
    ...mapGetters({
      customerInfo: customerInfoTypes.GET_CUSTOMER_INFO
    })
  },

  // go fetch backend data
  created (this: Component) {
    this['fetchCustomerInfo']()
  },
}
