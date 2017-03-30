import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { GET_CUSTOMER_INFO, PUT_UPDATE_CUSTOMER_INFO }
  from 'src/infrastructure/store/customer_info_types'

import CustomerInfoData from 'src/models/customer/CustomerInfoData'
import UpdateCustomerInfoRequest from 'src/models/customer/UpdateCustomerInfoRequest'

export default {
  name: 'CustomerInfo',

  computed: {
    ...mapGetters({
      customerInfo: GET_CUSTOMER_INFO
    })
  },

  methods: {
    ...mapActions({
      updateCustomer: PUT_UPDATE_CUSTOMER_INFO
    }),

    updateCustomerInfoEventHandler(this: Component) {
      debugger
      let customerInfo = this['customerInfo']
      let {customerName, firstName, lastName, middleName, defaultAddressId} = customerInfo
      let customerInfoData: CustomerInfoData = {
        customerName,
        firstName,
        lastName,
        middleName,
        defaultAddressId
      }

      let request: UpdateCustomerInfoRequest = {
        customer_id: customerInfo.id,
        version: customerInfo.version,
        customerInfoData
      }
      this['updateCustomer'](request)
    }
  }
}
